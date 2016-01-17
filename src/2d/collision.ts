module gml2d {
  let EPSILON = 1e-6;

  enum Halfspace {
    POSITIVE,
    NEGATIVE,
    COINCIDENT, // point is coincident with line, and does not line on either halfspaces
  }

  export function CategorizeHalfspace( point: Vec2, line: Line ): Halfspace {
    let p_to_l = point.subtract( line.point );
    let dp = p_to_l.dot( line.normal );
    if ( Math.abs( dp ) < EPSILON ) {
      return Halfspace.COINCIDENT;
    } else if ( dp > 0 ) {
      return Halfspace.POSITIVE;
    } else {
      return Halfspace.NEGATIVE;
    }
  }
}
