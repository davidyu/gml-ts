///<reference path="../mat.ts"/>

module gml {
  export class Mat4 extends Matrix {

    constructor( args: Float32Array );
    constructor( args: number[] );
    constructor( r00: number, r01: number, r02: number, tx: number, r10: number, r11: number, r12: number, ty: number, r20: number, r21: number, r22: number, tz: number, m30: number, m31: number, m32: number, m33: number );

    constructor( ...args: any[] ) {
      super( 4, 4 );
      if ( args.length === 1 ) {
        let arr = args[0];
        this.v[ 0] = arr[ 0];
        this.v[ 1] = arr[ 1];
        this.v[ 2] = arr[ 2];
        this.v[ 3] = arr[ 3];
        this.v[ 4] = arr[ 4];
        this.v[ 5] = arr[ 5];
        this.v[ 6] = arr[ 6];
        this.v[ 7] = arr[ 7];
        this.v[ 8] = arr[ 8];
        this.v[ 9] = arr[ 9];
        this.v[10] = arr[10];
        this.v[11] = arr[11];
        this.v[12] = arr[12];
        this.v[13] = arr[13];
        this.v[14] = arr[14];
        this.v[15] = arr[15];
      } else {
        this.v[ 0] = args[ 0];
        this.v[ 1] = args[ 1];
        this.v[ 2] = args[ 2];
        this.v[ 3] = args[ 3];
        this.v[ 4] = args[ 4];
        this.v[ 5] = args[ 5];
        this.v[ 6] = args[ 6];
        this.v[ 7] = args[ 7];
        this.v[ 8] = args[ 8];
        this.v[ 9] = args[ 9];
        this.v[10] = args[10];
        this.v[11] = args[11];
        this.v[12] = args[12];
        this.v[13] = args[13];
        this.v[14] = args[14];
        this.v[15] = args[15];
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

    public get m30(): number {
      return this.get( 3, 0 );
    }

    public get m31(): number {
      return this.get( 3, 1 );
    }

    public get m32(): number {
      return this.get( 3, 2 );
    }

    public get m33(): number {
      return this.get( 3, 3 );
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

    public set m30( v: number ) {
      this.set( 3, 0, v );
    }

    public set m31( v: number ) {
      this.set( 3, 1, v );
    }

    public set m32( v: number ) {
      this.set( 3, 2, v );
    }

    public set m33( v: number ) {
      this.set( 3, 3, v );
    }

    public get tx(): number {
      return this.get( 0, 3 );
    }

    public get ty(): number {
      return this.get( 1, 3 );
    }
    
    public get tz(): number {
      return this.get( 2, 3 );
    }

    public set tx( v: number ) {
      this.set( 0, 3, v );
    }

    public set ty( v: number ) {
      this.set( 1, 3, v ) ;
    }

    public set tz( v: number ) {
      this.set( 2, 3, v ) ;
    }

    public get w(): number {
      return this.get( 3, 3 );
    }

    public set w( v: number ) {
      this.set( 3, 3, v );
    }

    public row( r: number ): Vec4 {
      var row = [];
      for ( var i = 0; i < 4; i++ ) {
        row.push( this.get( r, i ) );
      }
      return new Vec4( row );
    }

    public column( c: number ): Vec4 {
      var column = [];
      for ( var i = 0; i < 4; i++ ) {
        column.push( this.get( i, c ) );
      }
      return new Vec4( column );
    }

    public get translation(): Vec4 {
      return this.column( 3 );
    }

    public set translation( t: Vec4 ) {
      this.setColumn( 3, t );
    }

    public get scale(): Vec3 {
      return new Vec3( this.get( 0, 0 ), this.get( 1, 1 ), this.get( 2, 2 ) );
    }

    public set scale( s: Vec3 ) {
      this.set( 0, 0, s.x );
      this.set( 1, 1, s.y );
      this.set( 2, 2, s.z );
    }

    public multiply( rhs: Mat4 ): Mat4;
    public multiply( s: number ): Mat4;
    public multiply( arg: any ): Mat4 {
      if ( arg instanceof Mat4 ) {
        return Mat4.matmul( this, arg );
      } else {
        return this.scalarmul( arg );
      }
    }

    public scalarmul( s: number ): Mat4 {
      return new Mat4( this.v[ 0] * s
                     , this.v[ 1] * s
                     , this.v[ 2] * s
                     , this.v[ 3] * s
                     , this.v[ 4] * s
                     , this.v[ 5] * s
                     , this.v[ 6] * s
                     , this.v[ 7] * s
                     , this.v[ 8] * s
                     , this.v[ 9] * s
                     , this.v[10] * s
                     , this.v[11] * s
                     , this.v[12] * s
                     , this.v[13] * s
                     , this.v[14] * s
                     , this.v[15] * s );
    }

    public subtract( rhs: Mat4 ): Mat4 {
      return new Mat4( this.v[ 0] - rhs.v[ 0]
                     , this.v[ 1] - rhs.v[ 1]
                     , this.v[ 2] - rhs.v[ 2]
                     , this.v[ 3] - rhs.v[ 3]
                     , this.v[ 4] - rhs.v[ 4]
                     , this.v[ 5] - rhs.v[ 5]
                     , this.v[ 6] - rhs.v[ 6]
                     , this.v[ 7] - rhs.v[ 7]
                     , this.v[ 8] - rhs.v[ 8]
                     , this.v[ 9] - rhs.v[ 9]
                     , this.v[10] - rhs.v[10]
                     , this.v[11] - rhs.v[11]
                     , this.v[12] - rhs.v[12]
                     , this.v[13] - rhs.v[13]
                     , this.v[14] - rhs.v[14]
                     , this.v[15] - rhs.v[15] );
    }

    public add( rhs: Matrix ): Mat4 {
      return new Mat4( this.v[ 0] + rhs.v[ 0]
                     , this.v[ 1] + rhs.v[ 1]
                     , this.v[ 2] + rhs.v[ 2]
                     , this.v[ 3] + rhs.v[ 3]
                     , this.v[ 4] + rhs.v[ 4]
                     , this.v[ 5] + rhs.v[ 5]
                     , this.v[ 6] + rhs.v[ 6]
                     , this.v[ 7] + rhs.v[ 7]
                     , this.v[ 8] + rhs.v[ 8]
                     , this.v[ 9] + rhs.v[ 9]
                     , this.v[10] + rhs.v[10]
                     , this.v[11] + rhs.v[11]
                     , this.v[12] + rhs.v[12]
                     , this.v[13] + rhs.v[13]
                     , this.v[14] + rhs.v[14]
                     , this.v[15] + rhs.v[15] );
    }

    public transform( rhs: Vec4 ): Vec4 {
      return new Vec4( this.r00 * rhs.x + this.r01 * rhs.y + this.r02 * rhs.z + this.tx * rhs.w
                     , this.r10 * rhs.x + this.r11 * rhs.y + this.r12 * rhs.z + this.ty * rhs.w
                     , this.r20 * rhs.x + this.r21 * rhs.y + this.r22 * rhs.z + this.tz * rhs.w
                     , this.m30 * rhs.x + this.m31 * rhs.y + this.m32 * rhs.z + this.m33 * rhs.w );
    }

    public invert(): Mat4 {
      let m00 = this.v[ 0];
      let m01 = this.v[ 1];
      let m02 = this.v[ 2];
      let m03 = this.v[ 3];
      let m10 = this.v[ 4];
      let m11 = this.v[ 5];
      let m12 = this.v[ 6];
      let m13 = this.v[ 7];
      let m20 = this.v[ 8];
      let m21 = this.v[ 9];
      let m22 = this.v[10];
      let m23 = this.v[11];
      let m30 = this.v[12];
      let m31 = this.v[13];
      let m32 = this.v[14];
      let m33 = this.v[15];

      let det = this.determinant;
      if ( det == 0 ) return Mat4.identity(); // fail

      let f = 1 / det;
      return new Mat4( f * -m13 * m22 * m31 + f * m12 * m23 * m31 + f * m13 * m21 * m32 - f * m11 * m23 * m32 - f * m12 * m21 * m33 + f * m11 * m22 * m33
                     , f *  m03 * m22 * m31 - f * m02 * m23 * m31 - f * m03 * m21 * m32 + f * m01 * m23 * m32 + f * m02 * m21 * m33 - f * m01 * m22 * m33
                     , f * -m03 * m12 * m31 + f * m02 * m13 * m31 + f * m03 * m11 * m32 - f * m01 * m13 * m32 - f * m02 * m11 * m33 + f * m01 * m12 * m33
                     , f *  m03 * m12 * m21 - f * m02 * m13 * m21 - f * m03 * m11 * m22 + f * m01 * m13 * m22 + f * m02 * m11 * m23 - f * m01 * m12 * m23

                     , f *  m13 * m22 * m30 - f * m12 * m23 * m30 - f * m13 * m20 * m32 + f * m10 * m23 * m32 + f * m12 * m20 * m33 - f * m10 * m22 * m33
                     , f * -m03 * m22 * m30 + f * m02 * m23 * m30 + f * m03 * m20 * m32 - f * m00 * m23 * m32 - f * m02 * m20 * m33 + f * m00 * m22 * m33
                     , f *  m03 * m12 * m30 - f * m02 * m13 * m30 - f * m03 * m10 * m32 + f * m00 * m13 * m32 + f * m02 * m10 * m33 - f * m00 * m12 * m33
                     , f * -m03 * m12 * m20 + f * m02 * m13 * m20 + f * m03 * m10 * m22 - f * m00 * m13 * m22 - f * m02 * m10 * m23 + f * m00 * m12 * m23

                     , f * -m13 * m21 * m30 + f * m11 * m23 * m30 + f * m13 * m20 * m31 - f * m10 * m23 * m31 - f * m11 * m20 * m33 + f * m10 * m21 * m33
                     , f *  m03 * m21 * m30 - f * m01 * m23 * m30 - f * m03 * m20 * m31 + f * m00 * m23 * m31 + f * m01 * m20 * m33 - f * m00 * m21 * m33
                     , f * -m03 * m11 * m30 + f * m01 * m13 * m30 + f * m03 * m10 * m31 - f * m00 * m13 * m31 - f * m01 * m10 * m33 + f * m00 * m11 * m33
                     , f *  m03 * m11 * m20 - f * m01 * m13 * m20 - f * m03 * m10 * m21 + f * m00 * m13 * m21 + f * m01 * m10 * m23 - f * m00 * m11 * m23

                     , f *  m12 * m21 * m30 - f * m11 * m22 * m30 - f * m12 * m20 * m31 + f * m10 * m22 * m31 + f * m11 * m20 * m32 - f * m10 * m21 * m32
                     , f * -m02 * m21 * m30 + f * m01 * m22 * m30 + f * m02 * m20 * m31 - f * m00 * m22 * m31 - f * m01 * m20 * m32 + f * m00 * m21 * m32
                     , f *  m02 * m11 * m30 - f * m01 * m12 * m30 - f * m02 * m10 * m31 + f * m00 * m12 * m31 + f * m01 * m10 * m32 - f * m00 * m11 * m32
                     , f * -m02 * m11 * m20 + f * m01 * m12 * m20 + f * m02 * m10 * m21 - f * m00 * m12 * m21 - f * m01 * m10 * m22 + f * m00 * m11 * m22 );
    }

    /**
     * @returns the determinant of this 4x4 matrix.
     *
     * Hand expanded for speed and to avoid call to Mat.LU, which is unoptimized and
     * expensive for real-time applications.
     */
    public get determinant(): number {
      let m00 = this.v[ 0];
      let m01 = this.v[ 1];
      let m02 = this.v[ 2];
      let m03 = this.v[ 3];
      let m10 = this.v[ 4];
      let m11 = this.v[ 5];
      let m12 = this.v[ 6];
      let m13 = this.v[ 7];
      let m20 = this.v[ 8];
      let m21 = this.v[ 9];
      let m22 = this.v[10];
      let m23 = this.v[11];
      let m30 = this.v[12];
      let m31 = this.v[13];
      let m32 = this.v[14];
      let m33 = this.v[15];

      return m03 * m12 * m21 * m30 - m02 * m13 * m21 * m30 - m03 * m11 * m22 * m30 + m01 * m13 * m22 * m30 +
             m02 * m11 * m23 * m30 - m01 * m12 * m23 * m30 - m03 * m12 * m20 * m31 + m02 * m13 * m20 * m31 +
             m03 * m10 * m22 * m31 - m00 * m13 * m22 * m31 - m02 * m10 * m23 * m31 + m00 * m12 * m23 * m31 +
             m03 * m11 * m20 * m32 - m01 * m13 * m20 * m32 - m03 * m10 * m21 * m32 + m00 * m13 * m21 * m32 +
             m01 * m10 * m23 * m32 - m00 * m11 * m23 * m32 - m02 * m11 * m20 * m33 + m01 * m12 * m20 * m33 +
             m02 * m10 * m21 * m33 - m00 * m12 * m21 * m33 - m01 * m10 * m22 * m33 + m00 * m11 * m22 * m33;
    }

    public transpose(): Mat4 {
      return new Mat4( super.transpose().v );
    }

    public get mat3(): Mat3 {
      return new Mat3( this.r00, this.r01, this.r02
                     , this.r10, this.r11, this.r12
                     , this.r20, this.r21, this.r22 );
    }

    public static identity(): Mat4 {
      return new Mat4( 1, 0, 0, 0
                     , 0, 1, 0, 0
                     , 0, 0, 1, 0
                     , 0, 0, 0, 1 );
    }

    /**
     * constructs a matrix representing a rotation around the Y axis, IE yaw.
     * @param angle the angle to rotate around the Y-axis by (rotation is counter-clockwise).
     */
    public static rotateY( angle: Angle ): Mat4 {
      let s = Math.sin( angle.toRadians() );
      let c = Math.cos( angle.toRadians() );
      return new Mat4( c, 0, -s, 0
                     , 0, 1,  0, 0
                     , s, 0,  c, 0
                     , 0, 0,  0, 1 );
    }

    /**
     * constructs a matrix representing a rotation around the X axis, IE pitch.
     * @param angle the angle to rotate around the X-axis by (rotation is counter-clockwise).
     */
    public static rotateX( angle: Angle ): Mat4 {
      let s = Math.sin( angle.toRadians() );
      let c = Math.cos( angle.toRadians() );
      return new Mat4( 1,  0, 0, 0
                     , 0,  c, s, 0
                     , 0, -s, c, 0
                     , 0,  0, 0, 1 );
    }

    /**
     * constructs a matrix representing a rotation around the Z axis, IE roll.
     * @param angle the angle to rotate around the Z-axis by (rotation is counter-clockwise).
     */
    public static rotateZ( angle: Angle ): Mat4 {
      let s = Math.sin( angle.toRadians() );
      let c = Math.cos( angle.toRadians() );
      return new Mat4(  c, s, 0, 0
                     , -s, c, 0, 0
                     ,  0, 0, 1, 0
                     ,  0, 0, 0, 1 );
    }

    /**
     * constructs a matrix representing a rotation around a user-specified axis.
     * @param axis  the axis of rotation.
     * @param angle the angle to rotate around the axis by (rotation is counter-clockwise).
     */
    public static rotate( axis: Vec4, angle: Angle ): Mat4 {
      let k = new Mat4(       0, -axis.z,  axis.y, 0
                      ,  axis.z,       0, -axis.x, 0
                      , -axis.y,  axis.x,       0, 0
                      ,       0,       0,       0, 0 );

      let k2 = k.multiply( k );

      let r = angle.toRadians();
    
      return Mat4.identity()
            .add( k.multiply( Math.sin( r ) ) )
            .add( k2.multiply( 1 - Math.cos( r ) ) );
    }

    /**
     * constructs a matrix representing a translation.
     */
    public static translate( v: Vec4 ): Mat4 {
      return new Mat4( 1, 0, 0, v.x
                     , 0, 1, 0, v.y
                     , 0, 0, 1, v.z
                     , 0, 0, 0, 1 );
    }

    static fromRows( r1: Vec4, r2: Vec4, r3: Vec4, r4: Vec4 ) {
      return new Mat4( r1.x , r1.y , r1.z , r1.w
                     , r2.x , r2.y , r2.z , r2.w
                     , r3.x , r3.y , r3.z , r3.w
                     , r4.x , r4.y , r4.z , r4.w );
    }

    static fromCols( c1: Vec4, c2: Vec4, c3: Vec4, c4: Vec4 ) {
      return new Mat4( c1.x, c2.x, c3.x, c4.x
                     , c1.y, c2.y, c3.y, c4.y
                     , c1.z, c2.z, c3.z, c4.z
                     , c1.w, c2.w, c3.w, c4.w );
    }

    public static matmul( lhs: Mat4, rhs: Mat4 ): Mat4 {
      let l00 = lhs.v[ 0];
      let l01 = lhs.v[ 1];
      let l02 = lhs.v[ 2];
      let l03 = lhs.v[ 3];
      let l10 = lhs.v[ 4];
      let l11 = lhs.v[ 5];
      let l12 = lhs.v[ 6];
      let l13 = lhs.v[ 7];
      let l20 = lhs.v[ 8];
      let l21 = lhs.v[ 9];
      let l22 = lhs.v[10];
      let l23 = lhs.v[11];
      let l30 = lhs.v[12];
      let l31 = lhs.v[13];
      let l32 = lhs.v[14];
      let l33 = lhs.v[15];
      let r00 = rhs.v[ 0];
      let r01 = rhs.v[ 1];
      let r02 = rhs.v[ 2];
      let r03 = rhs.v[ 3];
      let r10 = rhs.v[ 4];
      let r11 = rhs.v[ 5];
      let r12 = rhs.v[ 6];
      let r13 = rhs.v[ 7];
      let r20 = rhs.v[ 8];
      let r21 = rhs.v[ 9];
      let r22 = rhs.v[10];
      let r23 = rhs.v[11];
      let r30 = rhs.v[12];
      let r31 = rhs.v[13];
      let r32 = rhs.v[14];
      let r33 = rhs.v[15];

      return new Mat4( l00 * r00 + l01 * r10 + l02 * r20 + l03 * r30
                     , l00 * r01 + l01 * r11 + l02 * r21 + l03 * r31
                     , l00 * r02 + l01 * r12 + l02 * r22 + l03 * r32
                     , l00 * r03 + l01 * r13 + l02 * r23 + l03 * r33
                     , l10 * r00 + l11 * r10 + l12 * r20 + l13 * r30
                     , l10 * r01 + l11 * r11 + l12 * r21 + l13 * r31
                     , l10 * r02 + l11 * r12 + l12 * r22 + l13 * r32
                     , l10 * r03 + l11 * r13 + l12 * r23 + l13 * r33
                     , l20 * r00 + l21 * r10 + l22 * r20 + l23 * r30
                     , l20 * r01 + l21 * r11 + l22 * r21 + l23 * r31
                     , l20 * r02 + l21 * r12 + l22 * r22 + l23 * r32
                     , l20 * r03 + l21 * r13 + l22 * r23 + l23 * r33
                     , l30 * r00 + l31 * r10 + l32 * r20 + l33 * r30
                     , l30 * r01 + l31 * r11 + l32 * r21 + l33 * r31
                     , l30 * r02 + l31 * r12 + l32 * r22 + l33 * r32
                     , l30 * r03 + l31 * r13 + l32 * r23 + l33 * r33
                     );
    }
  }

  export function makePerspective( fov: Angle, aspectRatio: number, near: number, far: number ): Mat4 {
    let t = near * Math.tan( fov.toRadians() / 2 );
    let r = t * aspectRatio;
    let l = -r;
    let b = -t;
    let n = near;
    let f = far;

    return new Mat4( ( n * 2 ) / ( r - l ) , 0                     , ( r + l ) / ( r - l )      , 0
                   , 0                     , ( n * 2 ) / ( t - b ) , ( t + b ) / ( t - b )      , 0
                   , 0                     , 0                     , -( f + n ) / ( f - n )     , -( f * n * 2 ) / ( f - n )
                   , 0                     , 0                     , -1                         , 0 );
  }

  // aim, up, and right are all vectors that are assumed to be orthogonal
  export function makeLookAt( pos: Vec4, aim: Vec4, up: Vec4, right: Vec4 ): Mat4 {
    let x = right.normalized;
    let y = up.normalized;
    let z = aim.negate().normalized;

    var lookAt = Mat4.fromRows( x, y, z, new Vec4( 0, 0, 0, 1 ) );

    var npos = pos.negate();

    lookAt.tx = npos.dot( x );
    lookAt.ty = npos.dot( y );
    lookAt.tz = npos.dot( z );

    return lookAt;
  }
}
