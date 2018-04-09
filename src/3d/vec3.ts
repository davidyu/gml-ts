///<reference path="../vec.ts"/>

module gml {
  export class Vec3 extends Vector {
    constructor( v: number[] );
    constructor( v: Float32Array );
    constructor( x: number, y: number, z: number );

    constructor( ...args: any[] ) {
      super( 3 );
      if ( args.length == 3 ) {
        this.v[0] = args[0];
        this.v[1] = args[1];
        this.v[2] = args[2];
      } else if ( args.length == 1 ) {
        let arr = args[0];
        this.v[0] = arr[0];
        this.v[1] = arr[1];
        this.v[2] = arr[2];
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

    public get r(): number {
      return this.v[0];
    }

    public get g(): number {
      return this.v[1];
    }

    public get b(): number {
      return this.v[2];
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

    public set r( r: number ) {
      this.v[0] = r;
    }

    public set g( g: number ) {
      this.v[1] = g;
    }

    public set b( b: number ) {
      this.v[2] = b;
    }

    public add( rhs: Vec3 ): Vec3;
    public add( x: number, y: number, z: number ): Vec3;

    public add( ...args: any[] ): Vec3 {
      if ( args.length == 3 ) {
        return new Vec3( this.x + args[0], this.y + args[1], this.z + args[2] );
      } else {
        return new Vec3( this.x + args[0].x, this.y + args[0].y, this.z + args[0].z );
      }
    }

    public subtract( rhs: Vec3 ): Vec3 {
      return new Vec3( this.x - rhs.x, this.y - rhs.y, this.z - rhs.z );
    }

    public multiply( s: number ): Vec3 {
      return new Vec3( this.x * s, this.y * s, this.z * s );
    }

    public divide( d: number ): Vec3 {
      return new Vec3( this.x / d, this.y / d, this.z / d );
    }

    public negate(): Vec3 {
      return new Vec3( -this.x, -this.y, -this.z );
    }

    public dot( rhs: Vec3 ): number {
      return this.x * rhs.x + this.y * rhs.y + this.z * rhs.z;
    }

    public dot3( x: number, y: number, z: number ): number {
      return this.x * x + this.y * y + this.z * z;
    }

    public cross( rhs: Vec3 ): Vec3 {
      return new Vec3( this.y * rhs.z - this.z * rhs.y
                     , this.z * rhs.x - this.x * rhs.z
                     , this.x * rhs.y - this.y * rhs.x );
    }

    public get normalized(): Vec3 {
      var len = this.len;
      return new Vec3( this.x / len, this.y / len, this.z / len );
    }

    public map( callback: ( v: number ) => number ): Vec3 {
      return new Vec3( callback( this.v[0] ), callback( this.v[1] ), callback( this.v[2] ) );
    }

    public static randomInSphere( radius: number = 1 ): Vec3 {
      return new Vec3( Math.random(), Math.random(), Math.random() ).normalized.multiply( radius );
    }

    public static distance( lhs: Vec3, rhs: Vec3 ): number {
      let dx = lhs.x - rhs.x;
      let dy = lhs.y - rhs.y;
      let dz = lhs.z - rhs.z;
      return Math.sqrt( dx * dx + dy * dy + dz * dz );
    }

    public static distsq( lhs: Vec3, rhs: Vec3 ): number {
      let dx = lhs.x - rhs.x;
      let dy = lhs.y - rhs.y;
      let dz = lhs.z - rhs.z;
      return dx * dx + dy * dy + dz * dz;
    }

    public static add( lhs: Vec3, rhs: Vec3, out: Vec3 ): Vec3 {
      out.x = lhs.x + rhs.x;
      out.y = lhs.y + rhs.y;
      out.z = lhs.z + rhs.z;
      return out;
    }

    public static subtract( lhs: Vec3, rhs: Vec3, out: Vec3 ): Vec3 {
      out.x = lhs.x - rhs.x;
      out.y = lhs.y - rhs.y;
      out.z = lhs.z - rhs.z;
      return out;
    }

    public static multiply( lhs: Vec3, s: number, out: Vec3 ): Vec3 {
      out.x = lhs.x * s;
      out.y = lhs.y * s;
      out.z = lhs.z * s;
      return out;
    }

    public static divide( lhs: Vec3, d: number, out: Vec3 ): Vec3 {
      out.x = lhs.x / d;
      out.y = lhs.y / d;
      out.z = lhs.z / d;
      return out;
    }

    public static negate( lhs: Vec3, out: Vec3 ): Vec3 {
      out.x = -lhs.x;
      out.y = -lhs.y;
      out.z = -lhs.z;
      return out;
    }

    public static get zero(): Vec3 {
      return new Vec3( 0, 0, 0 );
    }
  }
}
