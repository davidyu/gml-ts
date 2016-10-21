module gml {
  /***
   * Any floating-point value smaller than EPSILON is considered to be zero.
   * @hidden
   */
  const EPSILON = 1e-6;

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

    static LineSegmentPlaneIntersection( seg_start: Vec4, seg_end: Vec4, pl: Plane, result: Vec4 ): boolean {
      return true;
    }

    /**
     * Clips a polygon with a set of planes using the Sutherland-Hodgman algorithm.
     *
     * @returns A polygon that is the result of the subject polygon clipped
     * by the clipper plane set
     */
    static Clip( subject: Polygon, clipper: Plane[] ): Polygon {
      let out_pts = [];

      for ( let i = 0; i < clipper.length; i++ ) {
        let plane = clipper[i];
        // iterate over points in polygon, checking two  points each time and categorizing them.
        let s = subject.points[ subject.points.length - 1 ];
        let intersection: Vec4 = Vec4.zero;
        for ( let j = 0; j < subject.points.length; j++ ) {
          let e = subject.points[j];

          let e_cat = Collision.CategorizeHalfspace( e, plane );
          let s_cat = Collision.CategorizeHalfspace( s, plane );

          if ( e_cat == Halfspace.POSITIVE ) {
            if ( s_cat != Halfspace.NEGATIVE ) {
              if ( Collision.LineSegmentPlaneIntersection( s, e, plane, intersection ) ) {
                out_pts.push( Vec4.clone( intersection ) );
              }
            }
            out_pts.push( Vec4.clone( e ) );
          }
        }
      }

      return new Polygon( out_pts );
    }
  }
}
