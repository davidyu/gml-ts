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
      return this.v[0] * rhs.v[0] + this.v[1] * rhs.v[1];
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

    public static squareDistance( lhs: Vec2, rhs: Vec2 ): number {
      return ( lhs.x - rhs.x ) * ( lhs.x - rhs.x ) + ( lhs.y - rhs.y ) * ( lhs.y - rhs.y ); 
    }

    // static arithmetic operators that take a constructed output parameter
    // because object construction and GC is expensive in JavaScript.
    public static add( lhs: Vec2, rhs: Vec2, out: Vec2 ): Vec2 {
      out.v[0] = lhs.v[0] + rhs.v[0];
      out.v[1] = lhs.v[1] + rhs.v[1];
      return out;
    }

    public static subtract( lhs: Vec2, rhs: Vec2, out: Vec2 ): Vec2 {
      out.v[0] = lhs.v[0] - rhs.v[0];
      out.v[1] = lhs.v[1] - rhs.v[1];
      return out;
    }

    public static multiply( lhs: Vec2, s: number, out: Vec2 ): Vec2 {
      out.v[0] = lhs.v[0] * s;
      out.v[1] = lhs.v[1] * s;
      return out;
    }

    public static divide( lhs: Vec2, d: number, out: Vec2 ): Vec2 {
      out.v[0] = lhs.v[0] / d;
      out.v[1] = lhs.v[1] / d;
      return out;
    }

    public static negate( lhs: Vec2, out: Vec2 ): Vec2 {
      out.v[0] = -lhs.v[0];
      out.v[1] = -lhs.v[1];
      return out;
    }

    public static copy( from: Vec2, to: Vec2 ) {
      to.v[0] = from.v[0];
      to.v[1] = from.v[0];
    }

    private static pool: Vec2[] = [
      new Vec2( 0, 0 ),
      new Vec2( 0, 0 ),
      new Vec2( 0, 0 ),
      new Vec2( 0, 0 ),
      new Vec2( 0, 0 ),
      new Vec2( 0, 0 ),
      new Vec2( 0, 0 ),
      new Vec2( 0, 0 ),
      new Vec2( 0, 0 ),
      new Vec2( 0, 0 ),
      new Vec2( 0, 0 ),
      new Vec2( 0, 0 ),
      new Vec2( 0, 0 ),
      new Vec2( 0, 0 ),
      new Vec2( 0, 0 ),
      new Vec2( 0, 0 ),
    ];

    public static getFromPool( i: number ): Vec2 {
      return Vec2.pool[i];
    }

    public static resizePool( newsize: number ): void {
      let oldsize = Vec2.pool.length;
      if ( newsize > oldsize ) {
        for ( let i = oldsize; i < newsize; i++ ) {
          Vec2.pool.push( new Vec2( 0, 0 ) );
        }
      } else if ( newsize < oldsize ) {
        Vec2.pool.slice( newsize - 1, oldsize - newsize );
      }
    }
  }
}
