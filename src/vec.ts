module gml {
  /* public-facing vector (constructor sugar)
    
     usage:
      new Vec(3)(x,y,z,...);
      new Vec(4)(a,b,c,d,...);
      new Vec(100)(x1,x2,...,x100);
  */

  export class Vec {
    constructor( size ) {
      return ( ...array: number[] ) => { return new Vector( size, array ); }
    }
  }

  // internal vector implementation; exported because Vec2, Vec3, Vec4 needs access
  export class Vector {
    private values: Float32Array;
    size: number;

    constructor( size, args: Float32Array );
    constructor( size, args: number[] );
    constructor( size, ...args: number[] );

    constructor( size, ...args: any[] ) {
      this.size = size;
      if ( args.length === 1 ) {
        if ( args[0] instanceof Float32Array ) {
          this.values = args[0];
        } else if ( args[0] instanceof Array ) {
          this.values = new Float32Array( args[0] );
        }
      } else {
        this.values = new Float32Array( args );
      }

      if ( this.values.length != this.size ) {
        console.warn( "input array " + args + " is not " + this.size + " elements long!" );
      }
    }

    public get Float32Array(): Float32Array {
      return this.values;
    }

    public get( index: number ): number {
      return this.values[index];
    }

    public sub( rhs: Vector ): Vector {
      return this.subtract( rhs );
    }

    public subtract( rhs: Vector ): Vector {
      if ( this.size != rhs.size ) {
        console.warn( "rhs not " + this.size + " elements long!" );
        return null;
      }

      var diff = [];
      for ( var i = 0; i < this.size; i++ ) {
        diff.push( this.values[i] - rhs.get( i ) );
      }
      return new Vector( this.size, diff );
    }

    public set( index: number, v: number ) {
      this.values[index] = v;
    }

    public add( rhs: Vector ): Vector {
      if ( this.size != rhs.size ) {
        console.warn( "rhs not " + this.size + " elements long!" );
        return null;
      }

      var sum = [];
      for ( var i = 0; i < this.size; i++ ) {
        sum.push( this.values[i] + rhs.get( i ) );
      }

      return new Vector( this.size, sum );
    }

    public scale( s: number ): Vector {
      var scaled = [];
      for ( var i = 0; i < this.size; i++ ) {
        scaled.push( this.values[i] * s );
      }

      return new Vector( this.size, scaled );
    }

    public negate(): Vector {
      return this.scale( -1 );
    }

    public get len(): number {
      return Math.sqrt( this.lensq );
    }

    public get lensq(): number {
      return this.values.reduce( ( acc, v ) => {
        return acc + v * v;
      }, 0 );
    }

    // this alters the underlying vector!
    public normalize(): void {
      const l = this.len;
      this.values = this.values.map( v => {
        return v / l;
      } );
    }

    public get normalized(): Vector {
      const l = this.len;
      var vs = [];
      for ( var i = 0; i < this.size; i++ ) {
        vs.push( this.values[i] / l );
      }
      return new Vector( vs.unshift( this.size ) );
    }

    public map( callback: ( v: number ) => number ): Vector {
      return new Vector( this.size, this.values.map( callback ) );
    }

    public toString(): string {
      var str = "";
      for ( let i = 0; i < this.size; i++ ) {
        str += this.values[i] + ","
      }
      return str.slice( 0, -1 );
    }
  }
}
