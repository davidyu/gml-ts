/// <reference path='../vec.ts'/>

module gml {
  export class Vec4 extends Vector {
    constructor( v: number[] );
    constructor( v: Float32Array );
    constructor( x: number, y: number, z: number, w: number );

    constructor( ...args: any[] ) {
      if ( args.length == 4 ) {
        super( 4, args[0], args[1], args[2], args[3] );
      } else if ( args.length == 1 ) {
        super( 4, args[0] );
      }
    }

    public get x(): number {
      return this.v[0];
    }

    public get y(): number {
      return this.v[1];
    }

    public get z(): number {
      return this.v[2];
    }

    public get w(): number {
      return this.v[3];
    }

    public get r(): number {
      return this.v[0];
    }

    public get g(): number {
      return this.v[1];
    }

    public get b(): number {
      return this.v[2];
    }

    public get a(): number {
      return this.v[3];
    }

    public get xyz(): Vec3 {
      return new Vec3( this.x, this.y, this.z );
    }

    public get xy(): Vec2 {
      return new Vec2( this.x, this.y );
    }

    public set x( x: number ) {
      this.v[0] = x;
    }

    public set y( y: number ) {
      this.v[1] = y;
    }

    public set z( z: number ) {
      this.v[2] = z;
    }

    public set w( w: number ) {
      this.v[3] = w;
    }

    public set r( r: number ) {
      this.v[0] = r;
    }

    public set g( g: number ) {
      this.v[1] = g;
    }

    public set b( b: number ) {
      this.v[2] = b;
    }

    public set a( a: number ) {
      this.v[3] = a;
    }

    public add( rhs: Vec4 ): Vec4 {
      return new Vec4( this.x + rhs.x, this.y + rhs.y, this.z + rhs.z, this.w + rhs.w );
    }

    public subtract( rhs: Vec4 ): Vec4 {
      return new Vec4( this.x - rhs.x, this.y - rhs.y, this.z - rhs.z, this.w - rhs.w );
    }

    public multiply( s: number ): Vec4 {
      return new Vec4( this.x * s, this.y * s, this.z * s, this.w * s );
    }

    public divide( d: number ): Vec4 {
      return new Vec4( this.x / d, this.y / d, this.z / d, this.w / d );
    }

    public negate(): Vec4 {
      return new Vec4( -this.x, -this.y, -this.z, -this.w );
    }

    public dot( rhs: Vec4 ): number {
      return this.x * rhs.x + this.y * rhs.y + this.z * rhs.z + this.w * rhs.w;
    }

    /**
     * Computes the cross product as if this were a 3D vector (Vec3)
     *
     * @returns a Vec4 with its xyz components representing the 3D cross product
     *          between this and rhs. The w component of the resulting vector is
     *          always set to 0
     */
    public cross( rhs: Vec4 ): Vec4 {
      return new Vec4( this.y * rhs.z - this.z * rhs.y
                     , this.z * rhs.x - this.x * rhs.z
                     , this.x * rhs.y - this.y * rhs.x
                     , 0 );
    }

    public get normalized(): Vec4 {
      var len = this.len;
      return new Vec4( this.x / len, this.y / len, this.z / len, this.w / len );
    }

    public map( callback: ( v: number ) => number ): Vec4 {
      return new Vec4( this.v.map( callback ) );
    }

    /**
     * @returns a random directional Vec4 in a user-specified sphere centered around (0, 0, 0).
     *          Note that the w-component of the Vec4 is 0.
     */
    public static randomInSphere( radius: number = 1 ): Vec4 {
      return new Vec4( Math.random(), Math.random(), Math.random(), 0 ).normalized.multiply( radius );
    }

    /**
     * @returns a random positional Vec4 in a user-specified sphere centered around (0, 0, 0).
     *          Note that the w-component of the Vec4 is 1.
     */
    public static randomPositionInSphere( radius: number = 1 ): Vec4 {
      let random = new Vec4( Math.random(), Math.random(), Math.random(), 0 ).normalized.multiply( radius )
      random.w = 1;
      return random;
    }

    public static get zero(): Vec4 {
      return new Vec4( 0, 0, 0, 0 );
    }

    public static get origin(): Vec4 {
      return new Vec4( 0, 0, 0, 1 );
    }

    public static get up(): Vec4 {
      return new Vec4( 0, 1, 0, 0 );
    }

    public static get right(): Vec4 {
      return new Vec4( 1, 0, 0, 0 );
    }
  }
}
