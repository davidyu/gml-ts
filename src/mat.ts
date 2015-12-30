///<reference path="vec.ts"/>

module gml {
  export class Matrix {
  /**
   * The raw contents of the matrix, encoded as a Float32Array.
   * Note that this is stored in row-major order, so it cannot be
   * directly passed into WebGL uniform methods. Use the matrix.m
   * property, which returns a transposed Float32Array. 
   */
    v: Float32Array;
    rows: number;
    cols: number;

  /**
   * The generic matrix constructor accepts three combinations of inputs:
   *
   * <pre>
   *  // its contents in the constructor parameters directly
   *  new Matrix(2,2,m00,m01,m10,m11);
   *
   *  // its contents as an array
   *  new Matrix(2,2,[m00,m01,m10,m11]);
   *
   *  // its contents as a Float32Array
   *  new Matrix(2,2,new Float32Array([m00,m01,m10,m11]));
   * </pre>
   *
   * Regardless of the input type, it will convert the contents of the array
   * into a Float32Array.
   *
   * Note that the contents are specified as a flattened row-major 2D array
   */
    constructor( rows: number, cols: number, args: Float32Array );
    constructor( rows: number, cols: number, args: number[] );
    constructor( rows: number, cols: number, ...args: number[] );
    constructor( rows: number, cols: number, ...args: any[] ) {
      this.rows = rows;
      this.cols = cols;
      if ( args.length == 1 ) {
        if ( args[0] instanceof Float32Array ) {
          this.v = args[0];
        } else if ( args[0] instanceof Array ) {
          this.v = new Float32Array( args[0] );
        }
      } else {
        this.v = new Float32Array( args );
      }
      if ( this.v.length != this.rows * this.cols ) {
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
      return new Matrix( this.cols, this.rows, this.transpose_Float32Array( this.v, this.rows, this.cols ) );
    }

    public get( r: number, c: number ): number {
      return this.v[ r * this.cols + c ];
    }

    public set( r: number, c: number, val: number ) {
      this.v[ r * this.cols + c ] = val;
    }

    public row( r: number ): Vector {
      var row = [];
      for ( var i = 0; i < this.cols; i++ ) {
        row.push( this.get( r, i ) );
      }
      return new Vector( this.cols, row );
    }

    public column( c: number ): Vector {
      var column = [];
      for ( var i = 0; i < this.rows; i++ ) {
        column.push( this.get( i, c ) );
      }
      return new Vector( this.rows, column );
    }

    /**
     * Sets a row in the matrix.
     * @param r   the row index
     * @param row the new contents of the row
     */
    public setRow( r: number, row: Vector ) {
      for ( var i = 0; i < this.cols; i++ ) {
        this.set( r, i, row.v[i] );
      }
    }

    /**
     * Sets a column in the matrix.
     * @param c   the column index
     * @param col the new contents of the column
     */
    public setColumn( c: number, col: Vector ) {
      for ( var i = 0; i < this.rows; i++ ) {
        this.set( i, c, col.v[i] );
      }
    }

    /**
     * Swaps two rows in the matrix.
     */
    public swapRows( r1: number, r2: number ) {
      var row1 = this.row( r1 );
      var row2 = this.row( r2 );
      this.setRow( r2, row1 );
      this.setRow( r1, row2 );
    }

    /**
     * NOTE: a trace is only defined for square matrices.
     * If you try to acquire the trace of a nonsquare matrix, the library
     * will not stop you or throw an excpetion, but the result will be
     * undefined/incorrect.
     */
    public get trace(): number {
      var tr = 0;
      for ( let i = 0; i < this.rows; i++ ) {
        tr += this.get( i, i );
      }
      return tr;
    }

    /**
     * @returns The LU decomposition of the matrix. If no such decomposition
     * exists, the l and u properties of the return object are both null.
     *
     * This implementation of LU decomposition uses the Doolittle algorithm.
     */
    public lu(): { l: Matrix, u: Matrix } {
      if ( this.rows != this.cols ) {
        console.warn( "matrix not square; cannot perform LU decomposition!" );
        return { l: null, u: null };
      }

      let l = Matrix.identity( this.rows );
      let u = new Matrix( this.rows, this.cols, this.v );

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

    /**
     * @returns the determinant of the matrix, if it is square.
     *
     * NOTE: If you try to acquire the determinant of a nonsquare matrix,
     * the result returned will be 0.
     *
     * If the LU decomposition of the matrix fails (IE: the matrix is linearly
     * dependent in terms of its row vectors or columns vectors), the result
     * returned will be 0.
     */
    public get determinant(): number {
      if ( this.rows != this.cols ) {
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

    /**
     * Componentwise addition of two matrices. Does not alter the original matrix.
     *
     * @returns a new matrix resulting from the addition
     */
    public add( rhs: Matrix ): Matrix {
      let vs = [];
      let rvs = rhs.v;
      for ( let i = 0; i < this.v.length; i++ ) {
        vs.push( this.v[i] + rvs[i] );
      }
      return new Matrix( this.rows, this.cols, vs );
    }

    /**
     * Componentwise subtraction of two matrices. Does not alter the original matrix.
     *
     * @returns a new matrix resulting from the subtraction operation this - rhs
     */
    public subtract( rhs: Matrix ): Matrix {
      let vs = [];
      let rvs = rhs.v;
      for ( let i = 0; i < this.v.length; i++ ) {
        vs.push( this.v[i] - rvs[i] );
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
      for ( let i = 0; i < this.v.length; i++ ) {
        vs.push( this.v[i] * s );
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
          out[ i * lhs.cols + j ] = sum;
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

    public toString(): string {
      var str = "";

      for ( var i = 0; i < this.rows; i++ ) {
        str += "\n\t";
        for ( var j = 0; j < this.cols; j++ ) {
          var v = this.get( i, j );
          str += v.toPrecision(8) + "\t";
        }
        str = str.slice( 0, -1 );
        str += "\n"
      }

      str = str.slice( 0, -1 );

      str += "\n";
      return str;
    }

    public toWolframString() {
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

    /**
     * @returns The contents of the matrix, stored in column-major order and
     * encoded as a Float32Array.
     */
    public get m(): Float32Array {
      return this.transpose_Float32Array( this.v, this.rows, this.cols );      
    }
  }
}
