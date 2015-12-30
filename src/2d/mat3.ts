///<reference path="../mat.ts"/>

module gml2d {
  /**
   *
   * @preferred
   *
   * an homogenous 2D transformation matrix (with rotations in theta specified in CCW):
   *
   * <pre>
   * sx * cos(theta),-sx * sin(theta), tx
   * sy * sin(theta), sy * cos(theta), ty
   * 0              , 0              ,  1
   * </pre>
   */


  /*
    from this, given a mat3:

    a b tx
    c d ty
    0 0 1

    we can derive:

    sx = sqrt( a*a + b*b )
    sy = sqrt( c*c + d*d )

    theta = atan( b/a ) or atan( -c/d ) with some caveats
  */
  export class Mat3 extends gml.Matrix {
    constructor( args: Float32Array );
    constructor( args: number[] );
    constructor( r00: number, r01: number, tx: number, r10: number, r11: number, ty: number, m20: number, m21: number, m22: number );

    constructor( ...args: any[] ) {
      super( 3, 3, args );
    }

    public get r00(): number {
      return this.get( 0, 0 );
    }

    public get r01(): number {
      return this.get( 0, 1 );
    }

    public get r10(): number {
      return this.get( 1, 0 );
    }

    public get r11(): number {
      return this.get( 1, 1 );
    }

    public get m20(): number {
      return this.get( 2, 0 );
    }

    public get r21(): number {
      return this.get( 2, 1 );
    }

    public get r22(): number {
      return this.get( 2, 2 );
    }

    public get tx(): number {
      return this.get( 0, 2 );
    }

    public get ty(): number {
      return this.get( 1, 2 );
    }

    public set tx( v: number ) {
      this.set( 0, 2, v );
    }

    public set ty( v: number ) {
      this.set( 1, 2, v ) ;
    }

    // slow public rotation accessor
    public get rotation(): gml.Angle {
      var a = this.get( 0, 0 ); // cos term
      var b = this.get( 0, 1 ); // sin term

      // when 90 < rot <= 270, atan returns  rot-180 (atan returns results in the [ -90, 90 ] range), so correct it
      if ( a < 0 ) {
        return gml.fromRadians( Math.atan( b / a ) + Math.PI );
      } else {
        return gml.fromRadians( Math.atan( b / a ) );
      }
    }

    // internal accessor
    private get rot_rad(): number {
      var a = this.get( 0, 0 ); // cos term
      var b = this.get( 0, 1 ); // sin term

      if ( a < 0 ) {
        return Math.atan( b / a ) + Math.PI;
      } else {
        return Math.atan( b / a );
      }
    }

    public set rotation( v: gml.Angle ) {
      var rad = v.toRadians();
      var sx = this.sx;
      var sy = this.sy;
      this.set( 0, 0, sx * Math.cos( rad ) );
      this.set( 0, 1, -sx * Math.sin( rad ) );
      this.set( 1, 0, sy * Math.sin( rad ) );
      this.set( 1, 1, sy * Math.cos( rad ) );
    }

    public get sx() {
      var a = this.get( 0, 0 );
      var b = this.get( 0, 1 );
      return Math.sqrt( a*a + b*b );
    }

    public get sy() {
      var c = this.get( 1, 0 );
      var d = this.get( 1, 1 );
      return Math.sqrt( c*c + d*d );
    }

    public set sx( v: number ) {
      var rad = this.rot_rad;
      this.set( 0, 0, v * Math.cos( rad ) );
      this.set( 0, 1, -v * Math.sin( rad ) );
    }

    public set sy( v: number ) {
      var rad = this.rot_rad;
      this.set( 1, 0, v * Math.sin( rad ) );
      this.set( 1, 1, v * Math.cos( rad ) );
    }

    public row( r: number ): Vec3 {
      var row = [];
      for ( var i = 0; i < 3; i++ ) {
        row.push( this.get( r, i ) );
      }
      return new Vec3( row );
    }

    public column( c: number ): Vec3 {
      var column = [];
      for ( var i = 0; i < 3; i++ ) {
        column.push( this.get( i, c ) );
      }
      return new Vec3( column );
    }

    public multiply( rhs: Mat3 ): Mat3;
    public multiply( s: number ): Mat3;
    public multiply( arg: any ): Mat3 {
      var m = super.multiply( arg );
      return new Mat3( m.m );
    }

    public static identity(): Mat3 {
      return new Mat3( 1, 0, 0
                     , 0, 1, 0
                     , 0, 0, 1 );
    }

    static fromRows( r1: Vec3, r2: Vec3, r3: Vec3 ) {
      return new Mat3( r1.x , r1.y , r1.w
                     , r2.x , r2.y , r2.w
                     , r3.x , r3.y , r3.w );
    }

    static fromCols( c1: Vec3, c2: Vec3, c3: Vec3 ) {
      return new Mat3( c1.x, c2.x, c3.x
                     , c1.y, c2.y, c3.y
                     , c1.w, c2.w, c3.w );
    }
  }
}
