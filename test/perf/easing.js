var Benchtable = require('benchtable');

var penner = require('easing-js');
var gml = require('./gml');
var opts = require( './benchmark_opts' );

var suite = {};

suite.ease = {
  cubicInOut: new Benchtable(),
  quadraticInOut: new Benchtable(),
  trigInOut: new Benchtable(),
  expInOut: new Benchtable(),
  backInOut: new Benchtable(),
};

suite.ease.cubicInOut
  .addFunction( 'CubicInOut', input => { gml.Easing.CubicInOut( input[0] ); }, opts )
  .addFunction( '(penner) CubicInOut', input => { penner.easeInOutCubic( input[0], 0, 1, 1 ); }, opts )
  .addInput( 'random t 1', [ Math.random() ] )
  .addInput( 'random t 2', [ Math.random() ] )
  .addInput( 'random t 3', [ Math.random() ] )
  .addInput( 'random t 4', [ Math.random() ] )
  .on('complete', function() {
    console.log(this.table.toString());
  }) 
  .run();

suite.ease.quadraticInOut
  .addFunction( 'QuadraticInOut', input => { gml.Easing.QuadInOut( input[0] ); }, opts )
  .addFunction( '(penner) easeInOutQuad', input => { penner.easeInOutQuad( input[0], 0, 1, 1 ); }, opts )
  .addInput( 'random t 1', [ Math.random() ] )
  .addInput( 'random t 2', [ Math.random() ] )
  .addInput( 'random t 3', [ Math.random() ] )
  .addInput( 'random t 4', [ Math.random() ] )
  .on('complete', function() {
    console.log(this.table.toString());
  }) 
  .run();

suite.ease.trigInOut
  .addFunction( 'TrigInOut', input => { gml.Easing.TrigInOut( input[0] ); }, opts )
  .addFunction( '(penner) easeInOutSine', input => { penner.easeInOutSine( input[0], 0, 1, 1 ); }, opts )
  .addInput( 'random t 1', [ Math.random() ] )
  .addInput( 'random t 2', [ Math.random() ] )
  .addInput( 'random t 3', [ Math.random() ] )
  .addInput( 'random t 4', [ Math.random() ] )
  .on('complete', function() {
    console.log(this.table.toString());
  }) 
  .run();

suite.ease.expInOut
  .addFunction( 'ExpInOut', input => { gml.Easing.ExpInOut( input[0] ); }, opts )
  .addFunction( '(penner) easeInOutExpo', input => { penner.easeInOutExpo( input[0], 0, 1, 1 ); }, opts )
  .addInput( 'random t 1', [ Math.random() ] )
  .addInput( 'random t 2', [ Math.random() ] )
  .addInput( 'random t 3', [ Math.random() ] )
  .addInput( 'random t 4', [ Math.random() ] )
  .on('complete', function() {
    console.log(this.table.toString());
  }) 
  .run();

suite.ease.backInOut
  .addFunction( 'BackInOut', input => { gml.Easing.BackInOut( input[0] ); }, opts )
  .addFunction( '(penner) easeInOutBack', input => { penner.easeInOutBack( input[0], 0, 1, 1 ); }, opts )
  .addInput( 'random t 1', [ Math.random() ] )
  .addInput( 'random t 2', [ Math.random() ] )
  .addInput( 'random t 3', [ Math.random() ] )
  .addInput( 'random t 4', [ Math.random() ] )
  .on('complete', function() {
    console.log(this.table.toString());
  }) 
  .run();
