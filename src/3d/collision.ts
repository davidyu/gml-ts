module gml {
  export enum Halfspace {
    POSITIVE,
    NEGATIVE,
    COINCIDENT, // point exists on plane itself, and does not line on either halfspaces
  }

  export class Collision {
    static CategorizeHalfspace( point: Vec4, plane: Plane ): Halfspace {
      let dp = plane.normal.dot( point );
      if ( Math.abs( dp - plane.d ) < EPSILON ) {
        return Halfspace.COINCIDENT;
      } else if ( dp > plane.d ) {
        return Halfspace.POSITIVE;
      } else {
        return Halfspace.NEGATIVE;
      }
    }
  }
}
