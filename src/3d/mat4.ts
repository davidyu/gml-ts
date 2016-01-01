///<reference path="../mat.ts"/>

module gml {
  export class Mat4 extends Matrix {

    constructor( args: Float32Array );
    constructor( args: number[] );
    constructor( r00: number, r01: number, r02: number, tx: number, r10: number, r11: number, r12: number, ty: number, r20: number, r21: number, r22: number, tz: number, m30: number, m31: number, m32: number, m33: number );

    constructor( ...args: any[] ) {
      if ( args.length === 1 ) {
        super( 4, 4, args[0] );
      } else {
        super( 4, 4, args );
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
      return new Mat4( this.r00 * s
                     , this.r01 * s
                     , this.r02 * s
                     , this.tx * s
                     , this.r10 * s
                     , this.r11 * s
                     , this.r12 * s
                     , this.ty * s
                     , this.r20 * s
                     , this.r21 * s
                     , this.r22 * s
                     , this.tz * s
                     , this.m30 * s
                     , this.m31 * s
                     , this.m32 * s
                     , this.m33 * s );
    }

    public subtract( rhs: Mat4 ): Mat4 {
      var m = super.subtract( rhs );
      return new Mat4( m.v );
    }

    public add( rhs: Matrix ): Mat4 {
      var m = super.add( rhs );
      return new Mat4( m.v );
    }

    public transform( rhs: Vec4 ): Vec4 {
      return new Vec4( this.r00 * rhs.x + this.r01 * rhs.y + this.r02 * rhs.z + this.tx * rhs.w
                     , this.r10 * rhs.x + this.r11 * rhs.y + this.r12 * rhs.z + this.ty * rhs.w
                     , this.r20 * rhs.x + this.r21 * rhs.y + this.r22 * rhs.z + this.tz * rhs.w
                     , this.m30 * rhs.x + this.m31 * rhs.y + this.m32 * rhs.z + this.m33 * rhs.w );
    }

    public invert(): Mat4 {
      let d = this.determinant;
      let tr = this.trace;
      let m2 = this.multiply( this );
      let m3 = this.multiply( m2 );
      let tr2 = m2.trace;
      let tr3 = m3.trace;
      let a = ( 1 / 6 ) * ( ( tr * tr * tr ) - ( 3 * tr * tr2 ) + ( 2 * tr3 ) );
      let b = ( 1 / 2 ) * ( tr * tr - tr2 );
      let c = m2.scalarmul( tr ).subtract( m3 );
      return Mat4.identity().scalarmul( a ).subtract( this.scalarmul( b ) ).add( c ).scalarmul( 1 / d );
    }

    /**
     * @returns the determinant of Mat4.
     *
     * Hand-rolled for Mat4 to avoid call to Mat.LU, which is unoptimized and
     * expensive for real-time applications.
     */
    public get determinant(): number {
      let m00 = this.r00;
      let m01 = this.r01;
      let m02 = this.r02;
      let m03 = this.tx;
      let m10 = this.r10;
      let m11 = this.r11;
      let m12 = this.r12;
      let m13 = this.ty;
      let m20 = this.r20;
      let m21 = this.r21;
      let m22 = this.r22;
      let m23 = this.tz;
      let m30 = this.m30;
      let m31 = this.m31;
      let m32 = this.m32;
      let m33 = this.m33;

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
      let l00 = lhs.r00;
      let l01 = lhs.r01;
      let l02 = lhs.r02;
      let l03 = lhs.tx;
      let l10 = lhs.r10;
      let l11 = lhs.r11;
      let l12 = lhs.r12;
      let l13 = lhs.ty;
      let l20 = lhs.r20;
      let l21 = lhs.r21;
      let l22 = lhs.r22;
      let l23 = lhs.tz;
      let l30 = lhs.m30;
      let l31 = lhs.m31;
      let l32 = lhs.m32;
      let l33 = lhs.m33;
      let r00 = rhs.r00;
      let r01 = rhs.r01;
      let r02 = rhs.r02;
      let r03 = rhs.tx;
      let r10 = rhs.r10;
      let r11 = rhs.r11;
      let r12 = rhs.r12;
      let r13 = rhs.ty;
      let r20 = rhs.r20;
      let r21 = rhs.r21;
      let r22 = rhs.r22;
      let r23 = rhs.tz;
      let r30 = rhs.m30;
      let r31 = rhs.m31;
      let r32 = rhs.m32;
      let r33 = rhs.m33;

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
