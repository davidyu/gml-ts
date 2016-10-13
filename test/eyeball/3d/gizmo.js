var gizmo_size = 0.10;

var gizmoZ = new gml.Vec4( 0, 0, gizmo_size, 1 );
var gizmoY = new gml.Vec4( 0, gizmo_size, 0, 1 );
var gizmoX = new gml.Vec4( gizmo_size, 0, 0, 1 );

function drawGizmo() {
  var mappedP = new gml.Vec4( 0, 0, 0, 0 );

  context.lineWidth = 1;

  var origin = new gml.Vec4( 0, 0, 0, 1 );
  mapToScreen( origin, canvas_width, canvas_height, mappedP );

  context.beginPath();
  context.moveTo( mappedP.x, mappedP.y );

  mapToScreen( gizmoZ, canvas_width, canvas_height, mappedP );

  context.lineTo( mappedP.x, mappedP.y );
  context.strokeStyle = BLUE;
  context.stroke();

  mapToScreen( origin, canvas_width, canvas_height, mappedP );

  context.beginPath();
  context.moveTo( mappedP.x, mappedP.y );

  mapToScreen( gizmoX, canvas_width, canvas_height, mappedP );

  context.lineTo( mappedP.x, mappedP.y );
  context.strokeStyle = RED;
  context.stroke();

  mapToScreen( origin, canvas_width, canvas_height, mappedP );

  context.beginPath();
  context.moveTo( mappedP.x, mappedP.y );

  mapToScreen( gizmoY, canvas_width, canvas_height, mappedP );

  context.lineTo( mappedP.x, mappedP.y );
  context.strokeStyle = GREEN;
  context.stroke();
}
