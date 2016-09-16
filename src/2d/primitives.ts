module gml2d {
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

  export interface Line {
    point: Vec2;  // a point on the line
    normal: Vec2;
  }

  enum Winding {
    CW,
    CCW,
  }

  // TODO: provide some sort of iterator sugar for iterating over edges of this polygon
  export class Polygon {
    points: Vec2[];

    /**
     * Implements a robust polygon convexity test described by Peter Schorn in Graphics Gems IV.
     * It correctly assesses the convexity for all polygons, including complex, self-intersecting
     * polygons like the pentagram.
     *
     * @returns whether or not the input polygon is a convex polygon.
     */
    static IsConvex( p: Polygon ): boolean {
      let target = _tmp_v2_a;
      let forward = _tmp_v2_b;

      Vec2.subtract( p.points[0], p.points[p.points.length - 2], target );
      Vec2.subtract( p.points[0], p.points[p.points.length - 1], forward );

      let dir = gml.sign( forward.cross( target ) );
      let changedir = 0

      // walk the points of the polygon and make sure we are always going in one direction (CW or CCW)
      for ( let i = 1; i < p.points.length; i++ ) {
        Vec2.subtract( p.points[i], p.points[ ( i - 2 + p.points.length ) % p.points.length ], target );
        Vec2.subtract( p.points[i], p.points[i-1], forward );

        let _dir = gml.sign( forward.cross( target ) );
        if ( _dir != dir ) changedir++;

        dir = _dir;
      }

      // early exit for simple case (if we changed directions p must be concave)
      if ( changedir > 0 ) {
        return false;
      } else {
        // check for collinear but overlapping edges by checking for
        // changes in direction in the x- and y- axis.
        let dx = gml.sign( p.points[0].x - p.points[p.points.length - 1].x ),
            dy = gml.sign( p.points[0].y - p.points[p.points.length - 1].y );

        let changex = 0, changey = 0;
        
        for ( let i = 1; i < p.points.length; i++ ) {
          let _dx = gml.sign( p.points[i].x - p.points[i-1].x );
          let _dy = gml.sign( p.points[i].y - p.points[i-1].y );

          if ( _dx != 0 && dx != _dx ) changex++;
          if ( _dy != 0 && dy != _dy ) changey++;

          dx = _dx;
          dy = _dy;
        }

        return changex <= 2 && changey <= 2;
      }
    }

    /**
     * Checks whether the polygon is CCW or CW by looking at the "area" of the polygon.
     * Nice geometric explanation here: http://blog.element84.com/polygon-winding.html
     *
     * @returns the winding of the polygon (CCW or CW)
     */
    static GetWinding( p: Polygon ): Winding {
      let area: number = 0;
      for ( let i = 0; i < p.points.length; i++ ) {
        let curr = p.points[i];
        let next = p.points[ ( i + 1 ) % p.points.length ];
        area += ( next.x - curr.x ) * ( next.y + curr.y )
      }

      return area > 0 ? Winding.CC : Winding.CCW;
    }

    static clone( p_in: Polygon ): Polygon {
      return { points: p_in.points.map( Vec2.clone ) }
    }
  }
}
