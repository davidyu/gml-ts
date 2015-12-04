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
      return this.get( 0 );
    }

    public get y(): number {
      return this.get( 1 );
    }

    public set x( v: number ) {
      this.set( 0, v );
    }

    public set y( v: number ) {
      this.set( 1, v );
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
      return new Vec2( [ this.x, this.y ].map( callback ) );
    }
  }
}
