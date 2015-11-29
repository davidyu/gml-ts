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
      return new Vec2( super.add( rhs ).Float32Array );
    }

    public subtract( rhs: Vec2 ): Vec2 {
      return new Vec2( super.subtract( rhs ).Float32Array );
    }

    public scale( s: number ): Vec2 {
      return new Vec2( super.scale( s ).Float32Array );
    }
    
    public negate(): Vec2 {
      return new Vec2( super.negate().Float32Array );
    }

    public map( callback: ( v: number ) => number ): Vec2 {
      return new Vec2( super.map( callback ).Float32Array );
    }
  }
}
