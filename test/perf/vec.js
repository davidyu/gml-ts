var Benchtable = require('benchtable');

var glm = require('gl-matrix');
var gml = require('./gml');
var opts = require( './benchmark_opts' );

var suite = {};

suite.constructors = {
  vec2: new Benchtable( "vec2 tests" ),
  vec3: new Benchtable( "vec3 tests" ),
  vec4: new Benchtable( "vec4 tests", { "maxTime": 1, "queued": true } )
};

suite.constructors.vec2
  .addFunction( 'new Vec2( x, y )', input => { new gml.Vec2( input[0], input[1] ); }, opts )
  .addFunction( '(gl-matrx) vec2.create()', input => { var v = glm.vec2.clone( input ); }, opts )
  .addInput( '0, 1', [ 0, 1 ] )
  .addInput( 'large numbers', [ 9007199254740991, 9007199254740991 ] )
  .addInput( 'large negative numbers', [ -9007199254740991, -9007199254740991 ] )
  .addInput( 'random floats', [ Math.random(), Math.random() ] )
  .on( 'complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    console.log(this.table.toString());
  }) 
  .run( );

suite.constructors.vec3
  .addFunction( 'new Vec3( x, y, z )', input => { new gml.Vec3( input[0], input[1], input[2] ); }, opts )
  .addFunction( '(gl-matrx) vec3.create()', input => { var v = glm.vec3.clone( input ); }, opts )
  .addInput( '0, 1, 2', [ 0, 1, 2 ] )
  .addInput( 'large numbers', [ 9007199254740991, 9007199254740991, 9007199254740991 ] )
  .addInput( 'large negative numbers', [ -9007199254740991, -9007199254740991, -9007199254740991 ] )
  .addInput( 'random floats', [ Math.random(), Math.random(), Math.random() ] )
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    console.log(this.table.toString());
  }) 
  .run();

suite.constructors.vec4
  .addFunction( 'new Vec4( x, y, z, w )', input => { new gml.Vec4( input[0], input[1], input[2], input[3] ); }, opts )
  .addFunction( '(gl-matrx) vec4.create()', input => { var v = glm.vec4.clone( input ); }, opts )
  .addInput( '0, 1, 2, 3', [ 0, 1, 2, 3 ] )
  .addInput( 'large numbers', [ 9007199254740991, 9007199254740991, 9007199254740991, 9007199254740991 ] )
  .addInput( 'large negative numbers', [ -9007199254740991, -9007199254740991, -9007199254740991, -9007199254740991 ] )
  .addInput( 'random floats', [ Math.random(), Math.random(), Math.random(), Math.random() ] )
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    console.log(this.table.toString());
  }) 
  .run();
