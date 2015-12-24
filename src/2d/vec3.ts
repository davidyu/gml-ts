///<reference path="../vec.ts"/>

module gml2d {
  export class Vec3 extends gml.Vector {
    constructor( v: number[] );
    constructor( v: Float32Array );
    constructor( x: number, y: number, z: number );

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

    public get z(): number {
      return this.v[2];
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

    public add( rhs: Vec3 ): Vec3 {
      return new Vec3( this.x + rhs.x, this.y + rhs.y, this.z + rhs.z );
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

    public cross( rhs: Vec3 ): number {
      return this.x * rhs.y - this.y * rhs.x;
    }

    public get normalized(): Vec3 {
      var len = this.len;
      return new Vec3( this.x / len, this.y / len, this.z / len );
    }

    public map( callback: ( v: number ) => number ): Vec3 {
      return new Vec3( this.v.map( callback ) );
    }
  }
}
