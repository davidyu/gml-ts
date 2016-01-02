module gml {
  export class Vector {

  /**
   * The raw contents of the vector, encoded as a Float32Array for WebGL.
   */
    v: Float32Array;
    size: number;

  /**
   * The generic vector constructor accepts three combinations of inputs:
   *
   * <pre>
   *  // its contents in the constructor parameters directly
   *  new Vector(2,x,y);
   *
   *  // its contents as an array
   *  new Vector(2,[x,y]);
   *
   *  // its contents as a Float32Array
   *  new Vector(2, new Float32Array([x,y]));
   * </pre>
   *
   * Regardless of the input type, it will convert the contents of the array
   * into a Float32Array.
   */
    constructor( size: number, args: Float32Array );
    constructor( size: number, args: number[] );
    constructor( size: number, ...args: number[] );

    constructor( size: number, ...args: any[] ) {
      this.size = size;
      this.v = new Float32Array( size );
      if ( args.length === 0 ) {
        return;
      } else if ( args.length === 1 ) {
        let arr = args[0];
        if ( arr instanceof Float32Array ) {
          this.v.set( arr );
        } else if ( arr instanceof Array ) {
          for ( let i = 0; i < size; i++ ) {
            this.v[i] = arr[i];
          }
        }
      } else {
        for ( let i = 0; i < size; i++ ) {
          this.v[i] = args[i];
        }
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
      let acc = 0;
      for ( var i = 0; i < this.v.length; i++ ) {
        acc += this.v[i] * this.v[i];
      }
      return acc;
    }

    /**
     * NOTE: this alters the underlying vector. For construction of
     * a new normalized vector, use the vector.normalized property.
     */
    public normalize(): void {
      const l = this.len;
      this.v = this.v.map( v => {
        return v / l;
      } );
    }

    public get normalized(): Vector {
      const l = this.len;
      var vs = [];
      for ( let i = 0; i < this.size; i++ ) {
        vs.push( this.v[i] / l );
      }
      return new Vector( vs.unshift( this.size ) );
    }

    public map( callback: ( v: number ) => number ): Vector {
      return new Vector( this.size, Array.prototype.slice.call( this.v ).map( callback ) );
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
