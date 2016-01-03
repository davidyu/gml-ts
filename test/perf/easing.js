var Benchtable = require('benchtable');

var penner = require('easing-js');
var gml = require('./gml');

var suite = {};

suite.constructors = {
  cubicInOut: new Benchtable(),
  quadraticInOut: new Benchtable(),
  trigInOut: new Benchtable(),
  expInOut: new Benchtable(),
  backInOut: new Benchtable(),
};

suite.constructors.cubicInOut
  .addFunction( 'CubicInOut', function( input ) {
    gml.Easing.CubicInOut( input[0] );
  } )
  .addFunction( '(penner) CubicInOut', function( input ) {
    penner.easeInOutCubic( input[0], 0, 1, 1 );
  } )
  .addInput( 'random t 1', [ Math.random() ] )
  .addInput( 'random t 2', [ Math.random() ] )
  .addInput( 'random t 3', [ Math.random() ] )
  .addInput( 'random t 4', [ Math.random() ] )
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    console.log(this.table.toString());
  }) 
  .run();

suite.constructors.quadraticInOut
  .addFunction( 'QuadraticInOut', function( input ) {
    gml.Easing.QuadInOut( input[0] );
  } )
  .addFunction( '(penner) easeInOutQuad', function( input ) {
    penner.easeInOutQuad( input[0], 0, 1, 1 );
  } )
  .addInput( 'random t 1', [ Math.random() ] )
  .addInput( 'random t 2', [ Math.random() ] )
  .addInput( 'random t 3', [ Math.random() ] )
  .addInput( 'random t 4', [ Math.random() ] )
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    console.log(this.table.toString());
  }) 
  .run();

suite.constructors.trigInOut
  .addFunction( 'TrigInOut', function( input ) {
    gml.Easing.TrigInOut( input[0] );
  } )
  .addFunction( '(penner) easeInOutSine', function( input ) {
    penner.easeInOutSine( input[0], 0, 1, 1 );
  } )
  .addInput( 'random t 1', [ Math.random() ] )
  .addInput( 'random t 2', [ Math.random() ] )
  .addInput( 'random t 3', [ Math.random() ] )
  .addInput( 'random t 4', [ Math.random() ] )
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    console.log(this.table.toString());
  }) 
  .run();

suite.constructors.expInOut
  .addFunction( 'ExpInOut', function( input ) {
    gml.Easing.ExpInOut( input[0] );
  } )
  .addFunction( '(penner) easeInOutExpo', function( input ) {
    penner.easeInOutExpo( input[0], 0, 1, 1 );
  } )
  .addInput( 'random t 1', [ Math.random() ] )
  .addInput( 'random t 2', [ Math.random() ] )
  .addInput( 'random t 3', [ Math.random() ] )
  .addInput( 'random t 4', [ Math.random() ] )
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    console.log(this.table.toString());
  }) 
  .run();

suite.constructors.backInOut
  .addFunction( 'BackInOut', function( input ) {
    gml.Easing.BackInOut( input[0] );
  } )
  .addFunction( '(penner) easeInOutBack', function( input ) {
    penner.easeInOutBack( input[0], 0, 1, 1 );
  } )
  .addInput( 'random t 1', [ Math.random() ] )
  .addInput( 'random t 2', [ Math.random() ] )
  .addInput( 'random t 3', [ Math.random() ] )
  .addInput( 'random t 4', [ Math.random() ] )
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    console.log(this.table.toString());
  }) 
  .run();
