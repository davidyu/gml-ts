///<reference path="../vec.ts"/>

/**
 * The gml2d library is mostly designed with 2D usage (games/visualization)
 * in mind.
 */
module gml2d {
  export class Vec2 extends gml.Vector {
    constructor( v: number[] );
    constructor( v: Float32Array );
    constructor( x: number, y: number );

    constructor( ...args: any[] ) {
      if ( args.length == 2 ) {
        super( 2, args[0], args[1] );
      } else if ( args.length == 1 ) {
        super( 2, args[0] );
      }
    }

    public get x(): number {
      return this.v[0];
    }

    public get y(): number {
      return this.v[1];
    }

    public set x( x: number ) {
      this.v[0] = x;
    }

    public set y( y: number ) {
      this.v[1] = y;
    }

    public add( rhs: Vec2 ): Vec2 {
      return new Vec2( this.x + rhs.x, this.y + rhs.y );
    }

    public subtract( rhs: Vec2 ): Vec2 {
      return new Vec2( this.x - rhs.x, this.y - rhs.y );
    }

    public multiply( s: number ): Vec2 {
      return new Vec2( this.x * s, this.y * s );
    }

    public divide( d: number ): Vec2 {
      return new Vec2( this.x / d, this.y / d );
    }

    public negate(): Vec2 {
      return new Vec2( -this.x, -this.y );
    }

    public dot( rhs: Vec2 ): number {
      return this.x * rhs.x + this.y * rhs.y;
    }

    public get normalized(): Vec2 {
      var len = this.len;
      return new Vec2( this.x / len, this.y / len );
    }

    /**
     * Computes the '2D' cross product
     */
    public cross( rhs: Vec2 ): number {
      return this.x * rhs.y - this.y * rhs.x;
    }

    public map( callback: ( v: number ) => number ): Vec2 {
      return new Vec2( callback( this.v[0] ), callback( this.v[1] ) );
    }

    public static randomInCircle( radius: number = 1 ): Vec2 {
      return new Vec2( Math.random(), Math.random() ).normalized.multiply( radius );
    }

    public static get zero(): Vec2 {
      return new Vec2( 0, 0 );
    }
  }
}
