// simple angle interface with explicit constructors

/**
 * The gml library is mostly designed with 3D usage (WebGL) in mind.
 * It aspires to be performant, but is not yet up to par with incumbent
 * libraries (EG: gl-matrix)
 */
module gml {
  /**
   * Construct Angles with gml.fromDegrees() or gml.fromRadians().
   */
  export interface Angle {
    toDegrees(): number;
    toRadians(): number;
    add( rhs: Angle ): Angle;
    subtract( rhs: Angle ): Angle;
    negate(): Angle;

   /**
    * ensures the Angle is within one full turn. IE: between 0 and 360 degrees
    * or 0 and 2 PI radians
    */
    reduceToOneTurn(): Angle;
  }

  export function fromRadians( rad: number ): Angle {
    return new Radian( rad );
  }

  export function fromDegrees( deg: number ): Angle {
    return new Degree( deg );
  }

  // implementation detail; no need to care about these classes
  class Degree implements Angle {
    v: number;

    constructor( deg: number ) {
      this.v = deg;
    }

    toDegrees(): number {
      return this.v;
    }

    toRadians(): number {
      return this.v * Math.PI / 180;
    }

    add( rhs: Angle ): Angle {
      return fromDegrees( this.v + rhs.toDegrees() );
    }

    subtract( rhs: Angle ): Angle {
      return fromDegrees( this.v - rhs.toDegrees() );
    }

    negate(): Angle {
      return fromDegrees( -this.v );
    }

    reduceToOneTurn(): Angle {
      if ( this.v >= 360 ) {
        return fromDegrees( this.v - 360 * Math.floor( this.v / 360 ) );
      } else if ( this.v < 0 ) {
        return fromDegrees( this.v + 360 * Math.ceil( -this.v / 360 ) );
      } else {
        return this;
      }
    }

    static get zero(): Angle {
      return new Degree( 0 );
    }
  }

  class Radian implements Angle {
    public static get TWO_PI(): number { return 6.283185307179586; }

    v: number;

    constructor( rad: number ) {
      this.v = rad;
    }

    toRadians(): number {
      return this.v;
    }

    toDegrees(): number {
      return this.v * 180 / Math.PI;
    }

    add( rhs: Angle ): Angle {
      return fromRadians( this.v + rhs.toRadians() );
    }

    subtract( rhs: Angle ): Angle {
      return fromRadians( this.v - rhs.toRadians() );
    }

    negate(): Angle {
      return fromRadians( -this.v );
    }

    reduceToOneTurn(): Angle {
      if ( this.v >= Radian.TWO_PI ) {
        return fromRadians( this.v - Radian.TWO_PI * Math.floor( this.v / Radian.TWO_PI ) );
      } else if ( this.v < 0 ) {
        return fromRadians( this.v + Radian.TWO_PI * Math.ceil( -this.v / Radian.TWO_PI ) );
      } else {
        return this;
      }
    }

    static get zero(): Angle {
      return new Radian( 0 );
    }
  }
}
