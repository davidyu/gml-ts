// simple angle interface with explicit constructors

module gml {
  export interface Angle {
    toDegrees(): number;
    toRadians(): number;
    add( rhs: Angle ): void;
    subtract( rhs: Angle ): void;
    reduceToOneTurn(): void;
  }

  export function fromRadians( rad: number ): Angle {
    return new Radian( rad );
  }

  export function fromDegrees( deg: number ): Angle {
    return new Degree( deg );
  }

  // implementation detail; no need to care about these classes
  export class Degree implements Angle {
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

    add( rhs: Angle ) {
      this.v += rhs.toDegrees();
    }

    subtract( rhs: Angle ) {
      this.v -= rhs.toDegrees();
    }

    reduceToOneTurn() {
      if ( this.v > 360 ) {
        this.v -= 360 * Math.floor( this.v / 360 );
      } else if ( this.v < 0 ) {
        this.v += 360 * Math.floor( -this.v / 360 );
      }
    }
  }

  export class Radian implements Angle {
    static TWO_PI: number = 2 * Math.PI;

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

    add( rhs: Angle ) {
      this.v += rhs.toRadians();
    }

    subtract( rhs: Angle ) {
      this.v -= rhs.toRadians();
    }

    reduceToOneTurn() {
      if ( this.v > Radian.TWO_PI ) {
        this.v -= Radian.TWO_PI * Math.floor( this.v / Radian.TWO_PI );
      } else if ( this.v < 0 ) {
        this.v += Radian.TWO_PI * Math.floor( -this.v / Radian.TWO_PI );
      }
    }
  }
}
