var Benchtable = require('benchtable');

var glm = require('gl-matrix');
var gml = require('./gml');
var opts = require( './benchmark_opts' );

var suite = {};

suite.constructors = {
  mat4: new Benchtable()
};

suite.ops = {
  mat4: new Benchtable()
};

var testMat4s = [
  [ 0.666671 , 0.783113 , 0.57046  , 0.560574 , 0.290019 , 0.733439 , 0.921717 , 0.292935 , 0.899691 , 0.0105077 , 0.136288 , 0.48864  , 0.344873 , 0.929396 , 0.393951 , 0.448761 ],
  [ 0.955797 , 0.255995 , 0.836308 , 0.277647 , 0.525669 , 0.180694 , 0.918072 , 0.322838 , 0.23226  , 0.0325114 , 0.172059 , 0.208264 , 0.158677 , 0.845031 , 0.877695 , 0.274273 ],
  [ 0.955797 , 0.255995 , 0.836308 , 0.277647 , 0.525669 , 0.180694 , 0.918072 , 0.322838 , 0.23226  , 0.0325114 , 0.172059 , 0.208264 , 0.158677 , 0.845031 , 0.877695 , 0.274273 ],
  [ 0.587865 , 0.63057  , 0.27614  , 0.862187 , 0.458977 , 0.528726 , 0.316026 , 0.145086 , 0.245281 , 0.516195  , 0.838137 , 0.914457 , 0.593094 , 0.200818 , 0.186433 , 0.386129 ],
];

suite.constructors.mat4
  .addFunction( 'new Mat4( ...args )'            , input => { new gml.Mat4( input[0], input[1], input[2], input[3], input[4], input[5], input[6], input[7], input[8], input[9], input[10], input[11], input[12], input[13], input[14], input[15] ); }, opts )
  .addFunction( 'new Mat4( array )'              , input => { new gml.Mat4( input ); }, opts )
  .addFunction( '(gl-matrx) mat4.create( array )', input => { var v = glm.mat4.clone( input ); }, opts )

  .addInput( 'test matrix 1' , testMat4s[0] )
  .addInput( 'test matrix 2' , testMat4s[1] )
  .addInput( 'test matrix 3' , testMat4s[2] )
  .addInput( 'test matrix 4' , testMat4s[3] )

  .on( 'complete', function() { console.log( this.table.toString() ); } ) 
  .run();

suite.ops.mat4
  .addFunction( 'invert', input => {
    var m = new gml.Mat4( input );
    m.invert();
  }, opts )

  .addFunction( '(gl-matrx) invert', input => {
    var m = glm.mat4.clone( input );
    var out = glm.mat4.create();
    glm.mat4.invert( out, m );
  }, opts )

  .addInput( 'test matrix 1' , testMat4s[0] )
  .addInput( 'test matrix 2' , testMat4s[1] )
  .addInput( 'test matrix 3' , testMat4s[2] )
  .addInput( 'test matrix 4' , testMat4s[3] )

  .on( 'complete', function() { console.log( this.table.toString() ); } ) 
  .run();
