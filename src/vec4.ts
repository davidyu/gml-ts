/// <reference path='vec.ts'/>

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

    public get normalized(): Vec4 {
      var len = this.len;
      return new Vec4( this.x / len, this.y / len, this.z / len, this.w / len );
    }

    public map( callback: ( v: number ) => number ): Vec4 {
      return new Vec4( this.v.map( callback ) );
    }
  }
}
