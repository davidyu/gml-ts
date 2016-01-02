///<reference path="../mat.ts"/>

module gml {

  export class Mat3 extends Matrix {
    constructor( args: Float32Array );
    constructor( args: number[] );
    constructor( r00: number, r01: number, tx: number, r10: number, r11: number, ty: number, m20: number, m21: number, m22: number );

    constructor( ...args: any[] ) {
      super( 3, 3 );
      if ( args.length === 1 ) {
        let arr = args[0];
        this.v[0] = arr[0];
        this.v[1] = arr[1];
        this.v[2] = arr[2];
        this.v[3] = arr[3];
        this.v[4] = arr[4];
        this.v[5] = arr[5];
        this.v[6] = arr[6];
        this.v[7] = arr[7];
        this.v[8] = arr[8];
      } else {
        this.v[0] = args[0];
        this.v[1] = args[1];
        this.v[2] = args[2];
        this.v[3] = args[3];
        this.v[4] = args[4];
        this.v[5] = args[5];
        this.v[6] = args[6];
        this.v[7] = args[7];
        this.v[8] = args[8];
      }
    }

    public get r00(): number {
      return this.get( 0, 0 );
    }

    public get r01(): number {
      return this.get( 0, 1 );
    }

    public get r02(): number {
      return this.get( 0, 2 );
    }

    public get r10(): number {
      return this.get( 1, 0 );
    }

    public get r11(): number {
      return this.get( 1, 1 );
    }

    public get r12(): number {
      return this.get( 1, 2 );
    }

    public get r20(): number {
      return this.get( 2, 0 );
    }

    public get r21(): number {
      return this.get( 2, 1 );
    }

    public get r22(): number {
      return this.get( 2, 2 );
    }

    public set r00( v: number ) {
      this.set( 0, 0, v );
    }

    public set r01( v: number ) {
      this.set( 0, 1, v );
    }

    public set r02( v: number ) {
      this.set( 0, 2, v );
    }

    public set r10( v: number ) {
      this.set( 1, 0, v );
    }

    public set r11( v: number ) {
      this.set( 1, 1, v );
    }

    public set r12( v: number ) {
      this.set( 1, 2, v );
    }

    public set r20( v: number ) {
      this.set( 2, 0, v );
    }

    public set r21( v: number ) {
      this.set( 2, 1, v );
    }

    public set r22( v: number ) {
      this.set( 2, 2, v );
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
      return new Mat3( m.v );
    }

    public scalarmul( s: number ): Mat3 {
      var m = super.scalarmul( s );
      return new Mat3( m.v );
    }

    public subtract( rhs: Mat3 ): Mat3 {
      var m = super.subtract( rhs );
      return new Mat3( m.v );
    }

    public add( rhs: Matrix ): Mat3 {
      var m = super.add( rhs );
      return new Mat3( m.v );
    }

    public transpose(): Mat3 {
      return new Mat3( super.transpose().v );
    }

    public transform( rhs: Vec3 ): Vec3 {
      return new Vec3( this.r00 * rhs.x + this.r01 * rhs.y + this.r02 * rhs.z
                     , this.r10 * rhs.x + this.r11 * rhs.y + this.r12 * rhs.z
                     , this.r20 * rhs.x + this.r21 * rhs.y + this.r22 * rhs.z );
    }

    /**
     * @returns the determinant of this 3x3 matrix.
     *
     * Hand expanded for speed and to avoid call to Mat.LU, which is unoptimized and
     * expensive for real-time applications.
     */
    public get determinant(): number {
      let m00 = this.v[0];
      let m01 = this.v[1];
      let m02 = this.v[2];
      let m10 = this.v[3];
      let m11 = this.v[4];
      let m12 = this.v[5];
      let m20 = this.v[6];
      let m21 = this.v[7];
      let m22 = this.v[8];

      return m00 * m11 * m22 - m00 * m12 * m21 + m01 * m12 * m20 - m01 * m10 * m22;
    }

    /**
     * constructs a Mat4 with the contents of this Mat3 forming the top-left
     * portion of the new Mat4. The translation portion of the new Mat4 is assumed
     * to be zero.
     *
     * E.G.:
     * <pre>
     * a b c       a b c 0
     * d e f  -->  d e f 0
     * g h i       g h i 0
     *             0 0 0 1
     * </pre>
     */
    public toMat4(): Mat4 {
      return new Mat4( this.r00, this.r01, this.r02, 0
                     , this.r10, this.r11, this.r12, 0
                     , this.r20, this.r21, this.r22, 0
                     ,        0,        0,        0, 1 );
    }

    /**
     * constructs a matrix representing a rotation around the Y axis, IE yaw.
     * @param angle the angle to rotate around the Y-axis by (rotation is counter-clockwise).
     */
    public static rotateY( angle: Angle ): Mat3 {
      let s = Math.sin( angle.toRadians() );
      let c = Math.cos( angle.toRadians() );
      return new Mat3( c, 0, -s
                     , 0, 1,  0
                     , s, 0,  c );
    }

    /**
     * constructs a matrix representing a rotation around the X axis, IE pitch.
     * @param angle the angle to rotate around the X-axis by (rotation is counter-clockwise).
     */
    public static rotateX( angle: Angle ): Mat3 {
      let s = Math.sin( angle.toRadians() );
      let c = Math.cos( angle.toRadians() );
      return new Mat3( 1,  0, 0
                     , 0,  c, s
                     , 0, -s, c );
    }

    /**
     * constructs a matrix representing a rotation around the Z axis, IE roll.
     * @param angle the angle to rotate around the Z-axis by (rotation is counter-clockwise).
     */
    public static rotateZ( angle: Angle ): Mat3 {
      let s = Math.sin( angle.toRadians() );
      let c = Math.cos( angle.toRadians() );
      return new Mat3(  c, s, 0
                     , -s, c, 0
                     ,  0, 0, 1 );
    }

    /**
     * constructs a matrix representing a rotation around a user-specified axis.
     * @param axis  the axis of rotation.
     * @param angle the angle to rotate around the axis by (rotation is counter-clockwise).
     */
    public static rotate( axis: Vec4, angle: Angle ): Mat3 {
      let k = new Mat3(       0, -axis.z,  axis.y
                      ,  axis.z,       0, -axis.x
                      , -axis.y,  axis.x,       0 );

      let k2 = k.multiply( k );

      let r = angle.toRadians();
    
      return Mat3.identity()
            .add( k.multiply( Math.sin( r ) ) )
            .add( k2.multiply( 1 - Math.cos( r ) ) );
    }

    public static identity(): Mat3 {
      return new Mat3( 1, 0, 0
                     , 0, 1, 0
                     , 0, 0, 1 );
    }

    static fromRows( r1: Vec3, r2: Vec3, r3: Vec3 ) {
      return new Mat3( r1.x , r1.y , r1.z
                     , r2.x , r2.y , r2.z
                     , r3.x , r3.y , r3.z );
    }

    static fromCols( c1: Vec3, c2: Vec3, c3: Vec3 ) {
      return new Mat3( c1.x, c2.x, c3.x
                     , c1.y, c2.y, c3.y
                     , c1.z, c2.z, c3.z );
    }
  }
}
