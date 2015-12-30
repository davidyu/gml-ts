///<reference path="../vec.ts"/>

module gml2d {
  /**
   * A 2D homogenous vector (x, y, w) representing the point (x/w, y/w) or the
   * vector (x,y)
   */
  export class Vec3 extends gml.Vector {
    constructor( v: number[] );
    constructor( v: Float32Array );
    constructor( x: number, y: number, w: number );

    constructor( ...args: any[] ) {
      if ( args.length == 3 ) {
        super( 3, args[0], args[1], args[2] );
      } else if ( args.length == 1 ) {
        super( 3, args[0] );
      }
    }

    public get x(): number {
      return this.v[0];
    }

    public get y(): number {
      return this.v[1];
    }

    public get w(): number {
      return this.v[2];
    }

    public set x( x: number ) {
      this.v[0] = x;
    }

    public set y( y: number ) {
      this.v[1] = y;
    }

    public set w( w: number ) {
      this.v[2] = w;
    }

    public add( rhs: Vec3 ): Vec3 {
      return new Vec3( this.x + rhs.x, this.y + rhs.y, this.w + rhs.w );
    }

    public subtract( rhs: Vec3 ): Vec3 {
      return new Vec3( this.x - rhs.x, this.y - rhs.y, this.w - rhs.w );
    }

    public multiply( s: number ): Vec3 {
      return new Vec3( this.x * s, this.y * s, this.w * s );
    }

    public divide( d: number ): Vec3 {
      return new Vec3( this.x / d, this.y / d, this.w / d );
    }

    public negate(): Vec3 {
      return new Vec3( -this.x, -this.y, -this.w );
    }

    public dot( rhs: Vec3 ): number {
      return this.x * rhs.x + this.y * rhs.y + this.w * rhs.w;
    }

    /**
     * Computes the '2D' cross product as if this were a 2D vector (Vec2)
     */
    public cross( rhs: Vec3 ): number {
      return this.x * rhs.y - this.y * rhs.x;
    }

    public get normalized(): Vec3 {
      var len = this.len;
      return new Vec3( this.x / len, this.y / len, this.w / len );
    }

    public map( callback: ( v: number ) => number ): Vec3 {
      return new Vec3( this.v.map( callback ) );
    }

    /**
     * @returns a random directional Vec3 in a user-specified circle centered around the origin.
     *          Note that the w-component of the Vec3 is 0.
     */
    public static randomInCircle( radius: number = 1 ): Vec3 {
      return new Vec3( Math.random(), Math.random(), 0 ).normalized.multiply( radius );
    }

    /**
     * @returns a random positional Vec3 in a user-specified circle centered around the origin.
     *          Note that the w-component of the Vec3 is 1.
     */
    public static randomPositionInCircle( radius: number = 1 ): Vec3 {
      let random = new Vec3( Math.random(), Math.random(), 0 ).normalized.multiply( radius );
      random.w = 1;
      return random;
    }

    public static get zero(): Vec3 {
      return new Vec3( 0, 0, 0 );
    }
  }
}
