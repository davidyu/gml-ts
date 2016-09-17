module gml2d {
  /***
   * Any floating-point value smaller than EPSILON is considered to be zero.
   * @hidden
   */
  const EPSILON = 1e-6;

  // optimization: assume we will call methods in the collision module very often.
  // instead of allocating new vectors in each function call, preallocate some temporary
  // vectors.

  /***
   * A temporary global static Vec2 that used by methods in this module
   * @hidden
   */
  let _tmp_v2_a = new Vec2( 0, 0 );

  /***
   * A temporary global static Vec2 that used by methods in this module
   * @hidden
   */
  let _tmp_v2_b = new Vec2( 0, 0 );

  /***
   * A temporary global static Vec2 that used by methods in this module
   * @hidden
   */
  let _tmp_v2_c = new Vec2( 0, 0 );

  export enum Halfspace {
    POSITIVE,
    NEGATIVE,
    COINCIDENT, // point is coincident with line, and does not line on either halfspaces
  }

  export interface AABB {
    min: Vec2;
    max: Vec2;
  }

  export class Collision {
    /**
     * Given a point, classifies on which side of a line it lies.
     */
    static CategorizeHalfspace( point: Vec2, line: Line ): Halfspace {
      let l_to_p = _tmp_v2_a;

      Vec2.subtract( point, line.point, l_to_p );
      let dp = l_to_p.dot( line.normal );
      if ( Math.abs( dp ) < EPSILON ) {
        return Halfspace.COINCIDENT;
      } else if ( dp > 0 ) {
        return Halfspace.POSITIVE;
      } else {
        return Halfspace.NEGATIVE;
      }
    }

    /**
     * Finds a fitted convex hull around the provided point cloud using Andrew's algorithm.
     * Note that it will sort the input point cloud array by default. If you don't want this behavior
     * you must supply false to the inplace parameter
     *
     * Uses _tmp_v2_a and _tmp_v2_b
     *
     * @returns A fitted convex hull from the supplied point cloud.
     */
    static ComputeConvexHull( points: Vec2[], inplace: boolean = true ): Polygon {
      if ( points.length <= 2 ) return { points: [] };

      let pts: Vec2[] = null;

      if ( inplace ) pts = points;
      else           pts = points.map( gml2d.Vec2.clone );

      let e = _tmp_v2_a;
      let last_edge = _tmp_v2_b;

      pts.sort( ( a: Vec2, b: Vec2 ) => {
        return a.x - b.x;
      } );

      // create upper chain
      let upper = [ pts[0], pts[1] ];

      for ( let i = 2; i < pts.length; i++ ) {
        let p = pts[i];

        Vec2.subtract( p, upper[ upper.length - 1 ], e );
        Vec2.subtract( upper[ upper.length - 1 ], upper[ upper.length - 2 ], last_edge );

        while ( last_edge.cross( e ) > 0 ) {
          // e is to the left of last_edge; error
          upper.pop();
          if ( upper.length < 2 ) break;
          Vec2.subtract( p, upper[ upper.length - 1 ], e );
          Vec2.subtract( upper[ upper.length - 1 ], upper[ upper.length - 2 ], last_edge );
        }
        upper.push( p );
      }

      // create lower chain
      let lower = [ pts[pts.length - 1], pts[pts.length - 2] ];

      for ( let i = pts.length - 3; i >= 0; i-- ) {
        let p = pts[i];
        Vec2.subtract( p, lower[ lower.length - 1 ], e );
        Vec2.subtract( lower[ lower.length - 1 ], lower[ lower.length - 2 ], last_edge );
        while ( last_edge.cross( e ) > 0 ) {
          // e is to the left of last_edge; error
          lower.pop();
          if ( lower.length < 2 ) break;
          Vec2.subtract( p, lower[ lower.length - 1 ], e );
          Vec2.subtract( lower[ lower.length - 1 ], lower[ lower.length - 2 ], last_edge );
        }
        lower.push( p );
      }

      // remove duplicate pts
      upper.pop();
      lower.pop();

      return { points: upper.concat( lower ) };
    }

    /**
     * @returns A fitted axis-aligned bounding box to the supplied point cloud.
     */
    static ComputeAABB( points: Vec2[] ): AABB {
      let tl = new Vec2( Number.MAX_VALUE, Number.MAX_VALUE );
      let br = new Vec2( -Number.MAX_VALUE, -Number.MAX_VALUE );

      for ( let i = 0; i < points.length; i++ ) {
        let p = points[i];

        let x = p.x;
        let y = p.y;

        if ( x < tl.x ) tl.x = x;
        if ( x > br.x ) br.x = x;
        if ( y < tl.y ) tl.y = y;
        if ( y > br.y ) br.y = y;
      }

      return { min: tl, max: br };
    }

    /**
     * Uses _tmp_v2_a and _tmp_v2_b
     *
     * @returns Whether the line segment intersects with the line.
     */
    static LineSegmentLineIntersection( seg_start: Vec2, seg_end: Vec2, line: Line, result: Vec2 ): boolean {
      // let p1, p2 be l_start, l_end
      // let o, n be the point and normal of the line l
      // let o_1 be the intersection point of the line defined by p1 and p2 and line l:
      //
      // we have    o_1                  = p1 + t(p2-p1)
      // and       (o_1-o) dot n         = 0
      // therefore (p1 + t(p2-p1)) dot n = 0
      //
      // after some simple arithmetic, we arrive at:
      //
      // t = n dot (o-p1) / n dot (p1-p2)
      //
      // if t is positive, then the intersection exists

      let ray = _tmp_v2_a;
      let seg_start_to_line = _tmp_v2_b;

      Vec2.subtract( seg_end, seg_start, ray );
      Vec2.subtract( line.point, seg_start, seg_start_to_line );

      let t = line.normal.dot( seg_start_to_line ) / line.normal.dot( ray );

      if ( t > 0 ) {
        Vec2.multiply( ray, t, result )
        return true;
      }

      return false;
    }

    /**
     * Clips a polygon with another polygon using the Sutherland-Hodgman algorithm.
     *
     * @returns A polygon that is the result of the subject polygon clipped
     * by the clipper polygon
     */
    static Clip( subject: Polygon, clipper: Polygon ): Polygon {
      let inside = Halfspace.COINCIDENT; // invalid, should be either positive or negative
      switch ( Polygon.GetWinding( clipper ) ) {
        case Winding.CW:
          inside = Halfspace.POSITIVE;
          break;
        case Winding.CCW:
          inside = Halfspace.NEGATIVE;
          break;
      }

      // assume this function is not called every frame, so allocating vectors in me is fine.
      // generally, clipping is done by an user-triggered action, after the user has confirmed
      // that the subject and clip polygon are correctly constructed and aligned.
      let out_pts = subject.points;
      let edge = { point: Vec2.zero, normal: Vec2.zero };
      let _tmp_local_v2_a: Vec2 = Vec2.zero;
      let _tmp_local_v2_b: Vec2 = Vec2.zero;

      // for each edge in the clipper poly
      for ( let i = 0; i < clipper.points.length; i++ ) {
        let start = clipper.points[i];
        let end   = clipper.points[ ( i + 1 ) % clipper.points.length ];

        let in_pts = out_pts.map( Vec2.clone ); // input = output
        out_pts = [];

        let s = in_pts[ in_pts.length - 1 ];
        for ( let j = 0; j < in_pts.length; j++ ) {
          let e = in_pts[j];
          edge.point.x = start.x;
          edge.point.y = start.y;
          
          Vec2.subtract( end, start, _tmp_local_v2_a );
          edge.normal.x = -_tmp_local_v2_a.y;
          edge.normal.y =  _tmp_local_v2_a.x;
          edge.normal.normalize();

          if ( Collision.CategorizeHalfspace( e, edge ) == inside ) {
            if ( Collision.CategorizeHalfspace( s, edge ) != inside ) {
              if ( Collision.LineSegmentLineIntersection( s, e, edge, _tmp_local_v2_b ) ) {
                out_pts.push( _tmp_local_v2_b );
              }
            }
            out_pts.push( e );
          } else if ( Collision.CategorizeHalfspace( s, edge ) == inside ) {
              if ( Collision.LineSegmentLineIntersection( s, e, edge, _tmp_local_v2_b ) ) {
                out_pts.push( _tmp_local_v2_b );
              }
          }

          s = e; // advance vertex pointer (look at the next edge in subject polygon)
        }
      }

      return { points: out_pts };
    }
  }
}
