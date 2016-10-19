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
  }
}
