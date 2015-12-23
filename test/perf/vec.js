var Benchmark = require('benchmark');

var glm = require('gl-matrix');
var gml = require('./gml');

var vec2_suite = new Benchmark.Suite;

vec2_suite.add( 'gml.Vec2.constructor', function() {
  new gml.Vec2( 0, 1 ) != null;
} )
.add( 'glm.vec2.create', function() {
  var v = glm.vec2.create();
  v[0] = 0;
  v[1] = 1;
  v != null;
} )
.on( 'cycle', function( e ) {
  console.log( String( e.target ) );
} )
.on( 'complete', function() {
  console.log( 'Fastest is ' + this.filter( 'fastest' ).pluck( 'name' ) );
} )
.run( { 'async': true } );

var vec3_suite = new Benchmark.Suite;

vec3_suite.add( 'gml.Vec3.constructor', function() {
  new gml.Vec3( 0, 1, 2 ) != null;
} )
.add( 'glm.vec3.create', function() {
  var v = glm.vec3.create();
  v[0] = 0;
  v[1] = 1;
  v[2] = 2;
  v != null;
} )
.on( 'cycle', function( e ) {
  console.log( String( e.target ) );
} )
.on( 'complete', function() {
  console.log( 'Fastest is ' + this.filter( 'fastest' ).pluck( 'name' ) );
} )
.run( { 'async': true } );

var vec4_suite = new Benchmark.Suite;

vec4_suite.add( 'gml.Vec4.constructor', function() {
  new gml.Vec4( 0, 1, 2, 3 ) != null;
} )
.add( 'glm.vec4.create', function() {
  var v = glm.vec4.create();
  v[0] = 0;
  v[1] = 1;
  v[2] = 2;
  v[3] = 3;
  v != null;
} )
.on( 'cycle', function( e ) {
  console.log( String( e.target ) );
} )
.on( 'complete', function() {
  console.log( 'Fastest is ' + this.filter( 'fastest' ).pluck( 'name' ) );
} )
.run( { 'async': true } );
