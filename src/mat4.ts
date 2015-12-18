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

    public setColumn( c: number, v: Vec4 ) {
      for ( var i = 0; i < 4; i++ ) {
        this.set( i, c, v.v[i] );
      }
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
      var m = super.multiply( arg );
      return new Mat4( m.m );
    }

    public scalarmul( s: number ): Mat4 {
      var m = super.scalarmul( s );
      return new Mat4( m.m );
    }

    public subtract( rhs: Mat4 ): Mat4 {
      var m = super.subtract( rhs );
      return new Mat4( m.m );
    }

    public add( rhs: Matrix ): Mat4 {
      var m = super.add( rhs );
      return new Mat4( m.m );
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

    public transpose(): Mat4 {
      return new Mat4( super.transpose().m );
    }

    public get mat3(): Mat3 {
      return new Mat3( this.r00, this.r10, this.r20
                     , this.r01, this.r11, this.r21
                     , this.r02, this.r21, this.r22 );
    }

    public static identity(): Mat4 {
      return new Mat4( 1, 0, 0, 0
                     , 0, 1, 0, 0
                     , 0, 0, 1, 0
                     , 0, 0, 0, 1 );
    }
  }

  export function makeMat4FromRows( r1: Vec4, r2: Vec4, r3: Vec4, r4: Vec4 ) {
    return new Mat4( r1.x , r1.y , r1.z , r1.w
                   , r2.x , r2.y , r2.z , r2.w
                   , r3.x , r3.y , r3.z , r3.w
                   , r4.x , r4.y , r4.z , r4.w );
  }

  export function makeMat4FromCols( c1: Vec4, c2: Vec4, c3: Vec4, c4: Vec4 ) {
    return new Mat4( c1.x, c2.x, c3.x, c4.x
                   , c1.y, c2.y, c3.y, c4.y
                   , c1.z, c2.z, c3.z, c4.z
                   , c1.w, c2.w, c3.w, c4.w );
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

    var lookAt = makeMat4FromRows( x, y, z, new Vec4( 0, 0, 0, 1 ) );

    lookAt.tx = -pos.x;
    lookAt.ty = pos.y;
    lookAt.tz = pos.z;

    return lookAt;
  }
}
