// globals

// canvas info
var canvas;
var canvas_width;
var canvas_height;
var context;

// color constants
var LIGHT_GREEN = '#7f7';
var LIGHT_RED   = '#f77';

function backingScale(context) {
  if ( 'devicePixelRatio' in window ) {
    if ( window.devicePixelRatio > 1 ) {
      return window.devicePixelRatio;
    }
  }
  return 1;
}

function initCanvas( elem ) {
  if ( elem ) canvas = elem;
  else        canvas = document.getElementById( "viewport" );

  context = canvas.getContext( '2d' );

  var scaleFactor = backingScale( context );

  canvas_width   = canvas.width;
  canvas_height  = canvas.height;

  if ( scaleFactor > 1 ) {
    canvas.width  *= scaleFactor;
    canvas.height *= scaleFactor;
    canvas.style.width  = canvas_width + "px";
    canvas.style.height = canvas_height + "px";
    context = canvas.getContext( '2d' ); // context has been updated
    context.scale( scaleFactor, scaleFactor );
  }
}
