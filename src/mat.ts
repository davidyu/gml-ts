module gml {
  /* public-facing matrix (constructor sugar)
    
     usage:
      new Matrix(3,3)(...);
      new Matrix(4,4)(...);
      new Matrix(100,6)(...);
  */
  export class Mat {
    constructor( r: number, c: number ) {
      return ( ...values: number[] ) => { return new Matrix( r, c, values ); }
    }
  }
  
  // internal matrix implementation; exported because Mat3, Mat4 needs access
  // note that matrices are stored in column major order to conform to WebGL
  export class Matrix {
    m: Float32Array;
    rows: number;
    cols: number;

    constructor( rows: number, cols: number, args: Float32Array );
    constructor( rows: number, cols: number, args: number[] );
    constructor( rows: number, cols: number, ...args: number[] );
    constructor( rows: number, cols: number, ...args: any[] ) {
      this.rows = rows;
      this.cols = cols;
      if ( args.length == 1 ) {
        if ( args[0] instanceof Float32Array ) {
          this.m = args[0];
        } else if ( args[0] instanceof Array ) {
          this.m = new Float32Array( args[0] );
        }
      } else {
        this.m = new Float32Array( args );
      }
      if ( this.m.length != this.rows * this.cols ) {
        console.warn( "input values " + args + " is not " + this.rows * this.cols + " elements long!" );
      }
    }

    private transpose_Float32Array( values: Float32Array, rows: number, cols: number ): Float32Array {
      var out = new Float32Array( rows * cols );
      for ( let i = 0; i < cols; i++ ) {
        for ( let j = 0; j < rows; j++ ) {
          out[ i * cols + j] = values[ j * cols + i ];
        }
      }
      return out;
    }

    public transpose(): Matrix {
      return new Matrix( this.cols, this.rows, this.transpose_Float32Array( this.m, this.rows, this.cols ) );
    }

    public get( r: number, c: number ): number {
      return this.m[ c * this.rows + r ];
    }

    public row( r: number ): Vector {
      var row = [];
      for ( var i = 0; i < this.cols; i++ ) {
        row.push( this.get( r, i ) );
      }
      return new Vector( this.cols, row );
    }

    public setRow( r: number, v: Vector ) {
      for ( var i = 0; i < this.cols; i++ ) {
        this.set( r, i, v.v[i] );
      }
    }

    public swapRows( r1: number, r2: number ) {
      var row1 = this.row( r1 );
      var row2 = this.row( r2 );
      this.setRow( r2, row1 );
      this.setRow( r1, row2 );
    }

    public column( c: number ): Vector {
      var column = [];
      for ( var i = 0; i < this.rows; i++ ) {
        column.push( this.get( i, c ) );
      }
      return new Vector( this.rows, column );
    }

    public get trace(): number {
      if ( this.rows != this.cols ) {
        console.warn( "matrix not square, cannot compute trace!" );
        return 0;
      }

      var tr = 0;
      for ( let i = 0; i < this.rows; i++ ) {
        tr += this.get( i, i );
      }
      return tr;
    }

    public lu(): { l: Matrix, u: Matrix } {
      if ( this.rows != this.cols ) {
        console.warn( "matrix not square; cannot perform LU decomposition!" );
        return { l: null, u: null };
      }

      let l = Matrix.identity( this.rows );
      let u = new Matrix( this.rows, this.cols, this.m );

      let size = this.rows;

      // apply doolittle algorithm
      for ( let n = 0; n < size; n++ ) {
        let l_i = Matrix.identity( size );
        let l_i_inv = Matrix.identity( size );
        // when multiplied with u, l_i eliminates elements below the main diagonal in the n-th column of matrix u
        // l_i_inv is the inverse to l_i, and is very easy to construct if we already have l_i
        // partial pivot
        if ( u.get( n, n ) == 0 ) {
          let success = false;
          for ( let j = n+1; j < size; j++ ) {
            if ( u.get( j, n ) != 0 ) {
              u.swapRows( n, j );
              success = true;
              break;
            }
          }
          if ( !success ) {
            console.warn( "matrix is singular; cannot perform LU decomposition!" );
            return { l: null, u: null };
          }
        }

        for ( let i = n+1; i < size; i++ ) {
          let l_i_n = -u.get( i, n ) / u.get( n, n );
          l_i.set( i, n, l_i_n );
          l_i_inv.set( i, n, -l_i_n );
        }

        l = l.multiply( l_i_inv );
        u = l_i.multiply( u );
      }

      return { l: l, u: u };
    }

    public get determinant(): number {
      if ( this.rows != this.cols ) {
        console.warn( "matrix not square, cannot perform LU decomposition!" );
        return 0;
      }

      let { l, u } = this.lu();

      if ( l == null || u == null ) {
        return 0;
      }

      var det = 1;
      for ( let i = 0; i < this.rows; i++ ) {
        det *= u.get( i, i );
      }
      return det;
    }

    public set( r: number, c: number, v: number ) {
      this.m[ c * this.rows + r ] = v;
    }

    public add( rhs: Matrix ): Matrix {
      let vs = [];
      let rvs = rhs.m;
      for ( let i = 0; i < this.m.length; i++ ) {
        vs.push( this.m[i] + rvs[i] );
      }
      return new Matrix( this.rows, this.cols, vs );
    }

    public subtract( rhs: Matrix ): Matrix {
      let vs = [];
      let rvs = rhs.m;
      for ( let i = 0; i < this.m.length; i++ ) {
        vs.push( this.m[i] - rvs[i] );
      }
      return new Matrix( this.rows, this.cols, vs );
    }

    public multiply( rhs: Matrix ): Matrix;
    public multiply( s: number ): Matrix;
    public multiply( arg: any ): Matrix {
      if ( arg instanceof Matrix ) {
        return Matrix.matmul( this, arg );
      } else {
        return this.scalarmul( arg );
      }
    }

    public scalarmul( s: number ): Matrix {
      let vs = [];
      for ( let i = 0; i < this.m.length; i++ ) {
        vs.push( this.m[i] * s );
      }
      return new Matrix( this.rows, this.cols, vs );
    }

    public static matmul( lhs: Matrix, rhs: Matrix ): Matrix {
      if ( lhs.rows != rhs.cols ) {
        console.warn( "lhs and rhs incompatible for matrix multiplication!" );
        return null;
      }

      var out = [];
      for ( let i = 0; i < lhs.rows; i++ ) {
        for ( let j = 0; j < rhs.cols; j++ ) {
          let sum = 0;
          for ( let k = 0; k < lhs.cols; k++ ) {
            sum += lhs.get( i, k ) * rhs.get( k, j );
          }
          out[ j * lhs.rows + i ] = sum;
        }
      }

      return new Matrix( lhs.rows, rhs.cols, out );
    }

    public static identity( size: number ): Matrix {
      var v = [];
      for ( let i = 0; i < size; i++ ) {
        for ( let j = 0; j < size; j++ ) {
          if ( i == j ) v.push( 1 );
          else          v.push( 0 );
        }
      }

      return new Matrix( size, size, v );
    }

    public toString() {
      var str = "{";

      for ( var i = 0; i < this.rows; i++ ) {
        str += "{";
        for ( var j = 0; j < this.cols; j++ ) {
          str += this.get( i, j ) + ",";
        }
        str = str.slice( 0, -1 );
        str += "},"
      }

      str = str.slice( 0, -1 );

      str += "}";
      return str;
    }
  }
}
