///<reference path="../vec.ts"/>

module gml {
  export class Vec2 extends Vector {
    constructor( v: number[] );
    constructor( v: Float32Array );
    constructor( x: number, y: number );

    constructor( ...args: any[] ) {
      super( 2 );
      if ( args.length == 2 ) {
        this.v[0] = args[0];
        this.v[1] = args[1];
      } else if ( args.length == 1 ) {
        let arr = args[0];
        this.v[0] = arr[0];
        this.v[1] = arr[1];
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

    public map( callback: ( v: number ) => number ): Vec2 {
      return new Vec2( callback( this.v[0] ), callback( this.v[1] ) );
    }

    public static randomInCircle( radius: number = 1 ): Vec2 {
      return new Vec2( Math.random(), Math.random() ).normalized.multiply( radius );
    }

    public static add( lhs: Vec2, rhs: Vec2, out: Vec2 ): Vec2 {
      out.x = lhs.x + rhs.x;
      out.y = lhs.y + rhs.y;
      return out;
    }

    public static subtract( lhs: Vec2, rhs: Vec2, out: Vec2 ): Vec2 {
      out.x = lhs.x - rhs.x;
      out.y = lhs.y - rhs.y;
      return out;
    }

    public static multiply( lhs: Vec2, s: number, out: Vec2 ): Vec2 {
      out.x = lhs.x * s;
      out.y = lhs.y * s;
      return out;
    }

    public static divide( lhs: Vec2, d: number, out: Vec2 ): Vec2 {
      out.x = lhs.x / d;
      out.y = lhs.y / d;
      return out;
    }

    public static negate( lhs: Vec2, out: Vec2 ): Vec2 {
      out.x = -lhs.x;
      out.y = -lhs.y;
      return out;
    }

    public static get zero(): Vec2 {
      return new Vec2( 0, 0 );
    }
  }
}
