var customEqualityTesters = {
  matrixEquality: function( a, b ) {
    var ABSOLUTE_ERROR = 1e-5;
    var RELATIVE_ERROR = 1e-4;
    if ( a instanceof gml.Matrix && b instanceof gml.Matrix ) {
      if ( a.rows != b.rows || a.cols != b.cols ) return false;
      for ( var i = 0; i < a.rows; i++ ) {
        for ( var j = 0; j < a.cols; j++ ) {
          var a_i_j = a.get( i, j );
          var b_i_j = b.get( i, j );
          var diff = Math.abs( a_i_j - b_i_j );
          var max = Math.max( Math.abs( a_i_j ), Math.abs( b_i_j ) );
          if ( diff > ABSOLUTE_ERROR && diff / max > RELATIVE_ERROR ) {
            console.log( "error comparing " + a_i_j + " and " + b_i_j + " relative error of " + diff / max );
            return false;
          }
        }
      }
      return true;
    }
  },

  angleEquality: function( a, b ) {
    if ( ( a instanceof gml.Degree || a instanceof gml.Radian ) && ( b instanceof gml.Degree || b instanceof gml.Radian ) ) {
      var ABSOLUTE_ERROR = 5e-5;
      var diff = Math.abs( a.toDegrees() - b.toDegrees() );
      return ( diff <= ABSOLUTE_ERROR );
    }
  }
}

describe( "angle tests", function() {
  it( "tests reduction", function() {
    expect( gml.fromDegrees( 720 ).reduceToOneTurn() ).toEqual( gml.fromDegrees( 360 ).reduceToOneTurn() );
    expect( gml.fromDegrees( 540 ).reduceToOneTurn() ).toEqual( gml.fromDegrees( 180 ) );
    expect( gml.fromDegrees( -180 ).reduceToOneTurn() ).toEqual( gml.fromDegrees( 180 ) );
    expect( gml.fromDegrees( -100 ).reduceToOneTurn() ).toEqual( gml.fromDegrees( 260 ) );
    expect( gml.fromDegrees( 180 ).add( gml.fromDegrees( 180 ) ) ).toEqual( gml.fromDegrees( 360 ) );
    expect( gml.fromDegrees( 180 ).add( gml.fromDegrees( -180 ) ) ).toEqual( gml.fromDegrees( 0 ) );
    expect( gml.fromDegrees( 10 ).reduceToOneTurn() ).toEqual( gml.fromDegrees( 10 ) );
    expect( gml.fromDegrees( 179 ).reduceToOneTurn() ).toEqual( gml.fromDegrees( 179 ) );
  } );
} );

describe( "vector tests", function() {
  it( "tests sanity", function() {
    var a = new gml.Vector( 2, 0, 1 );
    var b = new gml.Vector( 2, 2, 3 );

    expect( a.v[0] ).toBe( 0 );
    expect( a.v[1] ).toBe( 1 );
    expect( b.v[0] ).toBe( 2 );
    expect( b.v[1] ).toBe( 3 );

    var c = new gml.Vector( 2, [ 0, 1 ] );
    var d = new gml.Vector( 2, [ 2, 3 ] );

    expect( c.v[0] ).toBe( 0 );
    expect( c.v[1] ).toBe( 1 );
    expect( d.v[0] ).toBe( 2 );
    expect( d.v[1] ).toBe( 3 );

    var e = new gml.Vector( 2, new Float32Array( [ 0, 1 ] ) );
    var f = new gml.Vector( 2, new Float32Array( [ 2, 3 ] ) );

    expect( e.v[0] ).toBe( 0 );
    expect( e.v[1] ).toBe( 1 );
    expect( f.v[0] ).toBe( 2 );
    expect( f.v[1] ).toBe( 3 );
  } );

  it( "tests vec2 accessors", function() {
    var a = new gml.Vec2( 0, 1 );
    expect( a.x ).toBe( 0 );
    expect( a.y ).toBe( 1 );
    a.x = 2;
    a.y = 3;
    expect( a.x ).toBe( 2 );
    expect( a.y ).toBe( 3 );
  } );

  it( "tests vec3 accessors", function() {
    var a = new gml.Vec3( 0, 1, 2 );
    expect( a.x ).toBe( 0 );
    expect( a.y ).toBe( 1 );
    expect( a.z ).toBe( 2 );
    a.x = 3;
    a.y = 4;
    a.z = 5;
    expect( a.x ).toBe( 3 );
    expect( a.y ).toBe( 4 );
    expect( a.z ).toBe( 5 );
  } );

  it( "tests vec4 accessors", function() {
    var a = new gml.Vec4( 0, 1, 2, 3 );
    expect( a.x ).toBe( 0 );
    expect( a.y ).toBe( 1 );
    expect( a.z ).toBe( 2 );
    expect( a.w ).toBe( 3 );
    a.x = 3;
    a.y = 4;
    a.z = 5;
    a.w = 6;
    expect( a.x ).toBe( 3 );
    expect( a.y ).toBe( 4 );
    expect( a.z ).toBe( 5 );
    expect( a.w ).toBe( 6 );
  } );
} );

describe( "mat4 tests", function() {
  beforeEach( function() {
    jasmine.addCustomEqualityTester( customEqualityTesters.matrixEquality );
  } );

  it( "tests mat4 getters", function() {
    var a = new gml.Mat4( 1  , 2  , 3  , 4
                        , 5  , 6  , 7  , 8
                        , 9  , 10 , 11 , 12
                        , 13 , 14 , 15 , 16 );

    expect( a.r00 ).toBe( 1 );
    expect( a.r01 ).toBe( 2 );
    expect( a.r02 ).toBe( 3 );
    expect( a.tx  ).toBe( 4 );
    expect( a.r10 ).toBe( 5 );
    expect( a.r11 ).toBe( 6 );
    expect( a.r12 ).toBe( 7 );
    expect( a.ty  ).toBe( 8 );
    expect( a.r20 ).toBe( 9 );
    expect( a.r21 ).toBe( 10 );
    expect( a.r22 ).toBe( 11 );
    expect( a.tz  ).toBe( 12 );
    expect( a.m30 ).toBe( 13 );
    expect( a.m31 ).toBe( 14 );
    expect( a.m32 ).toBe( 15 );
    expect( a.m33 ).toBe( 16 );
  } );


  it( "tests mat4 setters", function() {
    var a = gml.Mat4.identity();

    a.r00 = 1;
    a.r01 = 2;
    a.r02 = 3;
    a.tx  = 4;
    a.r10 = 5;
    a.r11 = 6;
    a.r12 = 7;
    a.ty  = 8;
    a.r20 = 9;
    a.r21 = 10;
    a.r22 = 11;
    a.tz  = 12;
    a.m30 = 13;
    a.m31 = 14;
    a.m32 = 15;
    a.m33 = 16;

    expect( a.r00 ).toBe( 1 );
    expect( a.r01 ).toBe( 2 );
    expect( a.r02 ).toBe( 3 );
    expect( a.tx  ).toBe( 4 );
    expect( a.r10 ).toBe( 5 );
    expect( a.r11 ).toBe( 6 );
    expect( a.r12 ).toBe( 7 );
    expect( a.ty  ).toBe( 8 );
    expect( a.r20 ).toBe( 9 );
    expect( a.r21 ).toBe( 10 );
    expect( a.r22 ).toBe( 11 );
    expect( a.tz  ).toBe( 12 );
    expect( a.m30 ).toBe( 13 );
    expect( a.m31 ).toBe( 14 );
    expect( a.m32 ).toBe( 15 );
    expect( a.m33 ).toBe( 16 );
  } );

  it( "tests mat4 row and column getters", function() {
    var a = new gml.Mat4( 1  , 2  , 3  , 4
                        , 5  , 6  , 7  , 8
                        , 9  , 10 , 11 , 12
                        , 13 , 14 , 15 , 16 );

    var row0 = new gml.Vec4( 1, 2, 3, 4 );
    var row1 = new gml.Vec4( 5, 6, 7, 8 );
    var row2 = new gml.Vec4( 9,10,11,12 );
    var row3 = new gml.Vec4( 13,14,15,16 );

    expect( a.row( 0 ) ).toEqual( row0 );
    expect( a.row( 1 ) ).toEqual( row1 );
    expect( a.row( 2 ) ).toEqual( row2 );
    expect( a.row( 3 ) ).toEqual( row3 );

    var col0 = new gml.Vec4( 1, 5, 9,13 );
    var col1 = new gml.Vec4( 2, 6,10,14 );
    var col2 = new gml.Vec4( 3, 7,11,15 );
    var col3 = new gml.Vec4( 4, 8,12,16 );

    expect( a.column( 0 ) ).toEqual( col0 );
    expect( a.column( 1 ) ).toEqual( col1 );
    expect( a.column( 2 ) ).toEqual( col2 );
    expect( a.column( 3 ) ).toEqual( col3 );
  } );

  it( "tests mat4 row and column setters", function() {
    var a = gml.Mat4.identity();

    var row0 = new gml.Vec4( 1, 2, 3, 4 );
    var row1 = new gml.Vec4( 5, 6, 7, 8 );
    var row2 = new gml.Vec4( 9,10,11,12 );
    var row3 = new gml.Vec4( 13,14,15,16 );

    a.setRow( 0, row0 );
    a.setRow( 1, row1 );
    a.setRow( 2, row2 );
    a.setRow( 3, row3 );

    expect( a.row( 0 ) ).toEqual( row0 );
    expect( a.row( 1 ) ).toEqual( row1 );
    expect( a.row( 2 ) ).toEqual( row2 );
    expect( a.row( 3 ) ).toEqual( row3 );

    var col0 = new gml.Vec4( 10, 50, 90,130 );
    var col1 = new gml.Vec4( 20, 60,100,140 );
    var col2 = new gml.Vec4( 30, 70,110,150 );
    var col3 = new gml.Vec4( 40, 80,120,160 );

    a.setColumn( 0, col0 );
    a.setColumn( 1, col1 );
    a.setColumn( 2, col2 );
    a.setColumn( 3, col3 );

    expect( a.column( 0 ) ).toEqual( col0 );
    expect( a.column( 1 ) ).toEqual( col1 );
    expect( a.column( 2 ) ).toEqual( col2 );
    expect( a.column( 3 ) ).toEqual( col3 );
  } );

  it( "tests mat4 row and column setters", function() {
    var a = gml.Mat4.identity();

    var row0 = new gml.Vec4( 1, 2, 3, 4 );
    var row1 = new gml.Vec4( 5, 6, 7, 8 );
    var row2 = new gml.Vec4( 9,10,11,12 );
    var row3 = new gml.Vec4( 13,14,15,16 );

    a.setRow( 0, row0 );
    a.setRow( 1, row1 );
    a.setRow( 2, row2 );
    a.setRow( 3, row3 );

    expect( a.row( 0 ) ).toEqual( row0 );
    expect( a.row( 1 ) ).toEqual( row1 );
    expect( a.row( 2 ) ).toEqual( row2 );
    expect( a.row( 3 ) ).toEqual( row3 );

    var col0 = new gml.Vec4( 10, 50, 90,130 );
    var col1 = new gml.Vec4( 20, 60,100,140 );
    var col2 = new gml.Vec4( 30, 70,110,150 );
    var col3 = new gml.Vec4( 40, 80,120,160 );

    a.setColumn( 0, col0 );
    a.setColumn( 1, col1 );
    a.setColumn( 2, col2 );
    a.setColumn( 3, col3 );

    expect( a.column( 0 ) ).toEqual( col0 );
    expect( a.column( 1 ) ).toEqual( col1 );
    expect( a.column( 2 ) ).toEqual( col2 );
    expect( a.column( 3 ) ).toEqual( col3 );
  } );

  it( "tests matrix row swapping", function() {
    var a = new gml.Mat4( 1  , 2  , 3  , 4
                        , 5  , 6  , 7  , 8
                        , 9  , 10 , 11 , 12
                        , 13 , 14 , 15 , 16 );

    var row0 = new gml.Vec4( 1, 2, 3, 4 );
    var row1 = new gml.Vec4( 5, 6, 7, 8 );
    var row2 = new gml.Vec4( 9,10,11,12 );
    var row3 = new gml.Vec4( 13,14,15,16 );

    a.swapRows( 0, 1 );

    expect( a.row( 0 ) ).toEqual( row1 );
    expect( a.row( 1 ) ).toEqual( row0 );

    a.swapRows( 2, 3 );

    expect( a.row( 2 ) ).toEqual( row3 );
    expect( a.row( 3 ) ).toEqual( row2 );

    a.swapRows( 0, 2 );

    expect( a.row( 0 ) ).toEqual( row3 );
    expect( a.row( 2 ) ).toEqual( row1 );
 } );

  it( "tests mat4 matrix multiplication", function() {
    var a = gml.Mat4.identity();
    var b = new gml.Mat4( 1  , 2  , 3  , 4
                        , 5  , 6  , 7  , 8
                        , 9  , 10 , 11 , 12
                        , 13 , 14 , 15 , 16 );

    expect( a.multiply( b ) ).toEqual( b );

    var c = new gml.Mat4( 1  , 2  , 3  , 4
                        , 5  , 6  , 7  , 8
                        , 9  , 10 , 11 , 12
                        , 13 , 14 , 15 , 16 );

    var d = new gml.Mat4(17,21,25,29
                        ,18,22,26,30
                        ,19,23,27,31
                        ,20,24,28,32 );

    var d = new gml.Mat4(17,18,19,20
                        ,21,22,23,24
                        ,25,26,27,28
                        ,29,30,31,32);

    var e = new gml.Mat4(125,130,135,140
                        ,309,322,335,348
                        ,493,514,535,556
                        ,677,706,735,764).multiply( 2 );

    var f = c.multiply( d );

    expect( f ).toEqual( e );
  } );

  it( "tests LU decomposition", function() {
    var a = new gml.Mat4( 0, 2, 3, 4
                        , 5, 0, 7, 8
                        , 9,10, 0,12
                        ,13,14,15, 0 );

    var lu = a.lu();
    var l = lu.l;
    var u = lu.u;

    // make sure l is a lower triangular matrix
    for ( var i = 0; i < l.rows; i++ ) {
      for ( var j = i + 1; j < l.cols; j++ ) {
        expect( l.get( i, j ) ).toBeCloseTo( 0 );
      }
    }

    // make sure u is a upper triangular matrix
    for ( var i = 0; i < l.rows; i++ ) {
      for ( var j = 0; j < i; j++ ) {
        expect( u.get( i, j ) ).toBeCloseTo( 0 );
      }
    }

    var b = new gml.Mat4( 1, 5, 9,13
                        , 2, 6,10,14
                        , 3, 7,11,15
                        , 4, 8,12,16 );

    var lub = b.lu();
    expect( lub.l ).toBe( null );
    expect( lub.u ).toBe( null );
  } );

  it( "tests determinants", function() {
    var a = new gml.Mat4( 1, 5, 9,13
                        , 2, 6,10,14
                        , 3, 7,11,15
                        , 4, 8,12,16 );

    expect( a.determinant ).toBe( 0 );
  } );

  it( "tests inverse", function() {
    var a = new gml.Mat4( 0, 2, 3, 4
                        , 5, 0, 7, 8
                        , 9,10, 0,12
                        ,13,14,15, 0 );

    var b = a.invert();

    expect( a.multiply( b ) ).toEqual( gml.Mat4.identity() );
  } );

  it( "tests perspective transform matrix", function() {
    var fov = 45;
    var glMatrixPerspective = [];
    var aspect = 4/3;
    var near = 1;
    var far = 100;

    // construct ground truth to test against
    glMatrix.setMatrixArrayType( Array );
    mat4.perspective( glMatrixPerspective, gml.fromDegrees( fov ).toRadians(), aspect, near, far );
    mat4.transpose( glMatrixPerspective, glMatrixPerspective );

    var perspective = gml.makePerspective( gml.fromDegrees( fov ), aspect, near, far );
    var groundTruthPerspective = new gml.Mat4( glMatrixPerspective );

    expect( perspective ).toEqual( groundTruthPerspective );
  } );

  it( "tests camera matrix", function() {
    var NUM_ITERATIONS = 100;
    var POSITION_UPPER_LIMIT = 1;
    for ( var i = 0; i < NUM_ITERATIONS; i++ ) {
      var pos = gml.Vec4.randomInSphere( POSITION_UPPER_LIMIT );

      var aimV = gml.Vec4.randomInSphere();
      var rightV = gml.Vec4.randomInSphere();
      var upV = rightV.cross( aimV ).normalized;
      var rightV = aimV.cross( upV ).normalized;

      var glMatrixLookAt = [];
      mat4.lookAt( glMatrixLookAt, pos.xyz.v, pos.add( aimV ).xyz.v, upV.xyz.v );
      mat4.transpose( glMatrixLookAt, glMatrixLookAt );

      var groundTruthLookAt = new gml.Mat4( glMatrixLookAt );
      var lookAt = gml.makeLookAt( pos, aimV, upV, rightV );

      expect( lookAt ).toEqual( groundTruthLookAt );
    }
  } );

  it( "tests y-rotation matrix", function() {
    var NUM_ITERATIONS = 100;
    for ( var i = 0; i < NUM_ITERATIONS; i++ ) {
      var rot = Math.random() * Math.PI * 2;
      var glMatrixId = mat4.create();
      var glMatrixRotateY = [];

      mat4.rotateY( glMatrixRotateY, glMatrixId, -rot );
      mat4.transpose( glMatrixRotateY, glMatrixRotateY );

      var groundTruthRotateY = new gml.Mat4( glMatrixRotateY );
      var rotateY = gml.Mat4.rotateY( gml.fromRadians( rot ) );

      expect( groundTruthRotateY ).toEqual( rotateY );
    }
  } );

  it( "tests x-rotation matrix", function() {
    var NUM_ITERATIONS = 100;
    for ( var i = 0; i < NUM_ITERATIONS; i++ ) {
      var rot = Math.random() * Math.PI * 2;
      var glMatrixId = mat4.create();
      var glMatrixRotateX = [];

      mat4.rotateX( glMatrixRotateX, glMatrixId, -rot );
      mat4.transpose( glMatrixRotateX, glMatrixRotateX );

      var groundTruthRotateX = new gml.Mat4( glMatrixRotateX );
      var rotateX = gml.Mat4.rotateX( gml.fromRadians( rot ) );

      expect( groundTruthRotateX ).toEqual( rotateX );
    }
  } );

  it( "tests z-rotation matrix", function() {
    var NUM_ITERATIONS = 100;
    for ( var i = 0; i < NUM_ITERATIONS; i++ ) {
      var rot = Math.random() * Math.PI * 2;
      var glMatrixId = mat4.create();
      var glMatrixRotateZ = [];

      mat4.rotateZ( glMatrixRotateZ, glMatrixId, -rot );
      mat4.transpose( glMatrixRotateZ, glMatrixRotateZ );

      var groundTruthRotateZ = new gml.Mat4( glMatrixRotateZ );
      var rotateZ = gml.Mat4.rotateZ( gml.fromRadians( rot ) );

      expect( groundTruthRotateZ ).toEqual( rotateZ );
    }
  } );

  it( "tests arbitrary axis rotation matrix", function() {
    var NUM_ITERATIONS = 100;
    for ( var i = 0; i < NUM_ITERATIONS; i++ ) {
      var rot = Math.random() * Math.PI * 2;
      var glAxis = vec3.create();
      vec3.random( glAxis, 1 );
      var glMatrixId = mat4.create();
      var glMatrixRotate = [];

      mat4.rotate( glMatrixRotate, glMatrixId, -rot, glAxis );
      // not sure why I shouldn't transpose here...

      var groundTruthRotate = new gml.Mat4( glMatrixRotate );
      var rotate = gml.Mat4.rotate( new gml.Vec4( glAxis[0], glAxis[1], glAxis[2], 0 ), gml.fromRadians( rot ) );

      expect( groundTruthRotate ).toEqual( rotate );
    }
  } );
} );
