var gizmoZ = new gml.Vec4( 0, 0, 1, 0 );
var gizmoY = new gml.Vec4( 0, 1, 0, 0 );
var gizmoX = new gml.Vec4( 1, 0, 0, 0 );

var gizmo_size = 0.10;

function drawGizmo() {
  var mappedP = new gml.Vec4( 0, 0, 0, 0 );

  context.lineWidth = 1;

  var origin = new gml.Vec4( 0, 0, 0, 1 );
  mapToScreen( origin, canvas_width, canvas_height, mappedP );

  context.beginPath();
  context.moveTo( mappedP.x, mappedP.y );

  mapToScreen( gizmoZ.multiply( gizmo_size ), canvas_width, canvas_height, mappedP );

  context.lineTo( mappedP.x, mappedP.y );
  context.strokeStyle = BLUE;
  context.stroke();

  mapToScreen( origin, canvas_width, canvas_height, mappedP );

  context.beginPath();
  context.moveTo( mappedP.x, mappedP.y );

  mapToScreen( gizmoX.multiply( gizmo_size ), canvas_width, canvas_height, mappedP );

  context.lineTo( mappedP.x, mappedP.y );
  context.strokeStyle = RED;
  context.stroke();

  mapToScreen( origin, canvas_width, canvas_height, mappedP );

  context.beginPath();
  context.moveTo( mappedP.x, mappedP.y );

  mapToScreen( gizmoY.multiply( gizmo_size ), canvas_width, canvas_height, mappedP );

  context.lineTo( mappedP.x, mappedP.y );
  context.strokeStyle = GREEN;
  context.stroke();
}
