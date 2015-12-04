module gml {
  /* public-facing vector (constructor sugar)

     usage:
      new Vec(3)(x,y,z,...);
      new Vec(4)(a,b,c,d,...);
      new Vec(100)(x1,x2,...,x100);
  */

  export class Vec {
    constructor( size: number ) {
      return ( ...array: number[] ) => { return new Vector( size, array ); }
    }
  }

  // internal vector implementation; exported because Vec2, Vec3, Vec4 needs access
  export class Vector {
    v: Float32Array;
    size: number;

    constructor( size: number, args: Float32Array );
    constructor( size: number, args: number[] );
    constructor( size: number, ...args: number[] );
    constructor( size: number, ...args: any[] ) {
      this.size = size;
      if ( args.length === 1 ) {
        if ( args[0] instanceof Float32Array ) {
          this.v = args[0];
        } else if ( args[0] instanceof Array ) {
          this.v = new Float32Array( args[0] );
        }
      } else {
        this.v = new Float32Array( args );
      }

      if ( this.v.length != this.size ) {
        console.warn( "input array " + args + " is not " + this.size + " elements long!" );
      }
    }

    public add( rhs: Vector ): Vector {
      if ( this.size != rhs.size ) {
        console.warn( "rhs not " + this.size + " elements long!" );
        return null;
      }

      var sum = [];
      for ( let i = 0; i < this.size; i++ ) {
        sum.push( this.v[i] + rhs.v[i] );
      }

      return new Vector( this.size, sum );
    }

    public subtract( rhs: Vector ): Vector {
      if ( this.size != rhs.size ) {
        console.warn( "rhs not " + this.size + " elements long!" );
        return null;
      }

      var diff = [];
      for ( let i = 0; i < this.size; i++ ) {
        diff.push( this.v[i] - rhs.v[i] );
      }
      return new Vector( this.size, diff );
    }

    public multiply( s: number ): Vector {
      var scaled = [];
      for ( let i = 0; i < this.size; i++ ) {
        scaled.push( this.v[i] * s );
      }
      return new Vector( this.size, scaled );
    }

    public divide( d: number ): Vector {
      var divided = [];
      for ( let i = 0; i < this.size; i++ ) {
        divided.push( this.v[i] / d );
      }
      return new Vector( this.size, divided );
    }

    public negate(): Vector {
      var negated = [];
      for ( let i = 0; i < this.size; i++ ) {
        negated.push( -this.v[i] );
      }
      return new Vector( this.size, negated );
    }

    public dot( rhs: Vector ): number {
      if ( this.size != rhs.size ) {
        console.warn( "rhs not " + this.size + " elements long!" );
        return null;
      }
      var dp = 0;
      for ( let i = 0; i < this.size; i++ ) {
        dp += this.v[0] * rhs.v[0];
      }
    }

    public equals( b: Vector ): boolean {
      if ( this.size != b.size ) return false;
      for ( let i = 0; i < this.size; i++ ) {
        if ( this.v[i] != b.v[i] ) return false;
      }
      return true;
    }

    public get len(): number {
      return Math.sqrt( this.lensq );
    }

    public get lensq(): number {
      return this.v.reduce( ( acc, v ) => {
        return acc + v * v;
      }, 0 );
    }

    // this alters the underlying vector
    public normalize(): void {
      const l = this.len;
      this.v = this.v.map( v => {
        return v / l;
      } );
    }

    // this returns a new vector
    public unit(): Vector {
      const l = this.len;
      var vs = [];
      for ( let i = 0; i < this.size; i++ ) {
        vs.push( this.v[i] / l );
      }
      return new Vector( vs.unshift( this.size ) );
    }

    public get normalized(): Vector {
      return this.unit();
    }

    public map( callback: ( v: number ) => number ): Vector {
      return new Vector( this.size, this.v.map( callback ) );
    }

    public toString(): string {
      var str = "";
      for ( let i = 0; i < this.size; i++ ) {
        str += this.v[i] + ","
      }
      return str.slice( 0, -1 );
    }
  }
}
