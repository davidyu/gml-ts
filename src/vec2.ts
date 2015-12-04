module gml {
  export class Vec2 extends Vector {
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

    public map( callback: ( v: number ) => number ): Vec2 {
      return new Vec2( this.v.map( callback ) );
    }
  }
}
