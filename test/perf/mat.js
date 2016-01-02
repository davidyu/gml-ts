var Benchtable = require('benchtable');

var glm = require('gl-matrix');
var gml = require('./gml');

var suite = {};

suite.constructors = {
  mat4: new Benchtable()
};

suite.constructors.mat4
  .addFunction( 'invert', function( input ) {
    var m = new gml.Mat4( input );
    m.invert();
  } )
  .addFunction( '(gl-matrx) invert', function( input ) {
    var m = glm.mat4.clone( input );
    var out = glm.mat4.create();
    glm.mat4.invert( out, m );
  } )
  .addInput( 'test matrix 1', [[ 0.666671, 0.783113, 0.57046, 0.560574, 0.290019, 0.733439, 0.921717, 0.292935, 0.899691, 0.0105077, 0.136288, 0.48864, 0.344873, 0.929396, 0.393951, 0.448761 ]] )
  .addInput( 'test matrix 2', [[ 0.955797, 0.255995, 0.836308, 0.277647, 0.525669, 0.180694, 0.918072, 0.322838, 0.23226, 0.0325114, 0.172059, 0.208264, 0.158677, 0.845031, 0.877695, 0.274273 ]] )
  .addInput( 'test matrix 3', [[ 0.955797, 0.255995, 0.836308, 0.277647, 0.525669, 0.180694, 0.918072, 0.322838, 0.23226, 0.0325114, 0.172059, 0.208264, 0.158677, 0.845031, 0.877695, 0.274273 ]] )
  .addInput( 'test matrix 4', [[ 0.587865, 0.63057, 0.27614, 0.862187, 0.458977, 0.528726, 0.316026, 0.145086, 0.245281, 0.516195, 0.838137, 0.914457, 0.593094, 0.200818, 0.186433, 0.386129 ]] )
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    console.log(this.table.toString());
  }) 
  .run();
