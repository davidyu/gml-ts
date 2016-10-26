module gml {
  export enum Halfspace {
    POSITIVE,
    NEGATIVE,
    COINCIDENT, // point exists on plane itself, and does not line on either halfspaces
  }

  export class Collision {
    /**
     * Given a point, classifies on which side of a plane it lies.
     */
    static CategorizeHalfspace( point: Vec4, plane: Plane ): Halfspace {
      // we know that for the plane, N dot p0 + d = 0 where p0 is a point on the plane
      // we know that the point p is on the positive side of the halfspace iff:
      //      N dot (p - p0) > 0
      //   => N dot p - N dot p0 > 0
      //   => N dot p - (-d) > 0 (substituting N dot p0 = -d)
      //   => N dot p > -d
      let dp = plane.normal.dot( point );
      if ( Math.abs( dp + plane.d ) < EPSILON ) {
        return Halfspace.COINCIDENT;
      } else if ( dp > -plane.d ) {
        return Halfspace.POSITIVE;
      } else {
        return Halfspace.NEGATIVE;
      }
    }

    /**
     * Computes the point of intersection between a line segment and a plane if one exists.
     *
     * @returns true if there exists a single point intersection between the line segment and a plane
     *          false if there exists no intersections or if the line segment lies on the plane
     */
    static LineSegmentPlaneIntersection( seg_start: Vec4, seg_end: Vec4, pl: Plane, result: Vec4 ): boolean {
      // let p1, p2 be seg_start, seg_end respectively.
      // let p, n be some point on and the normal of the plane pl respectively, let d be the parameter d of the plane pl.
      // let p' be the intersection point of the line defined by the line segment and the plane.
      //
      // we have   p'                         = p1 + t*(p2-p1)
      // and       p dot n + d                = 0
      // =>        (p1 + t*(p2-p1)) dot n + d = 0
      //
      // after some arithmetic, we arrive at:
      //
      // t = -(n dot p1 + d)/(n dot (p2-p1))
      //
      // if n dot (p2-p1) = 0, then the line is parallel with the plane (it lies on the plane if n dot p1 + d is also 0).
      let r = seg_end.subtract( seg_start );
      let denom = pl.normal.dot( r );

      if ( denom != 0 ) {
        let t = -( pl.normal.dot( seg_start ) + pl.d ) / denom;
        if ( t > 0 && t <= 1 ) {
          Vec4.multiply( r, t, result );
          Vec4.add( seg_start, result, result );
          return true;
        }
      }

      return false;
    }

    /**
     * Computes the point of intersection between a ray and a plane if one exists.
     *
     * @returns true if there exists a single point intersection between the ray and a plane
     *          false if there exists no intersections or if the ray lies on the plane
     */
    static RayPlaneIntersection( ray: Ray, pl: Plane, result: Vec4 ): boolean {
      // let o, v be the start and direction of ray.
      // let p, n be some point on and the normal of the plane pl respectively, let d be the parameter d of the plane pl.
      // let p' be the intersection point of the ray and the plane.
      //
      // we have   p'                  = o + t*v
      // and       p dot n + d         = 0
      // =>        (o + t*v) dot n + d = 0
      //
      // after some arithmetic, we arrive at:
      //
      // t = -(n dot o + d)/(n dot v)
      //
      // if n dot v = 0, then the ray is parallel with the plane (it lies on the plane if n dot o + d is also 0).
      let denom = pl.normal.dot( ray.direction );

      if ( denom != 0 ) {
        let t = -( pl.normal.dot( ray.point ) + pl.d ) / denom;
        if ( t > 0 ) {
          Vec4.multiply( ray.direction, t, result );
          Vec4.add( ray.point, result, result );
          return true;
        }
      }

      return false;
    }

    /**
     * Clips a polygon with a set of planes using the Sutherland-Hodgman algorithm.
     *
     * @returns A polygon that is the result of the subject polygon clipped
     * by the clipper plane set
     */
    static Clip( subject: Polygon, clipper: Plane[] ): Polygon {
      let out_pts = [];

      // assume the positive halfspace means inside
      let inside = Halfspace.POSITIVE;

      for ( let i = 0; i < clipper.length; i++ ) {
        let plane = clipper[i];
        // iterate over points in polygon, checking two  points each time and categorizing them.
        let s = subject.points[ subject.points.length - 1 ];
        let intersection: Vec4 = Vec4.zero;
        for ( let j = 0; j < subject.points.length; j++ ) {
          let e = subject.points[j];

          let e_cat = Collision.CategorizeHalfspace( e, plane );
          let s_cat = Collision.CategorizeHalfspace( s, plane );

          if ( e_cat == inside ) {
            if ( s_cat != inside ) {
              if ( Collision.LineSegmentPlaneIntersection( s, e, plane, intersection ) ) {
                out_pts.push( Vec4.clone( intersection ) );
              }
            }
            out_pts.push( Vec4.clone( e ) );
          } else if ( s_cat == inside ) {
            if ( Collision.LineSegmentPlaneIntersection( s, e, plane, intersection ) ) {
              out_pts.push( Vec4.clone( intersection ) );
            }
          }

          s = e; // advance vertex pointer ( look at the next edge in subject polygon)
        }
      }

      return new Polygon( out_pts );
    }
  }
}
