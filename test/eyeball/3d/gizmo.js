var gizmo_size = 0.10;

var gizmoZ = new gml.Vec4( 0, 0, gizmo_size, 1 );
var gizmoY = new gml.Vec4( 0, gizmo_size, 0, 1 );
var gizmoX = new gml.Vec4( gizmo_size, 0, 0, 1 );

var gizmoScreenPosition = new gml.Vec2( 0.9, 0.9 ); // bottom right corner

function moveToScreenPosition( in_out_point ) {
  in_out_point.x += gizmoScreenPosition.x * canvas_width - canvas_width / 2;
  in_out_point.y += gizmoScreenPosition.y * canvas_height - canvas_height / 2;
}

function drawGizmo() {
  var mappedP = new gml.Vec4( 0, 0, 0, 0 );

  context.lineWidth = 1;

  var origin = new gml.Vec4( 0, 0, 0, 1 );
  mapToScreenOrtho( origin, canvas_width, canvas_height, mappedP );
  moveToScreenPosition( mappedP );

  context.beginPath();
  context.moveTo( mappedP.x, mappedP.y );

  mapToScreenOrtho( gizmoZ, canvas_width, canvas_height, mappedP );
  moveToScreenPosition( mappedP );

  context.lineTo( mappedP.x, mappedP.y );
  context.strokeStyle = BLUE;
  context.stroke();

  mapToScreenOrtho( origin, canvas_width, canvas_height, mappedP );
  moveToScreenPosition( mappedP );

  context.beginPath();
  context.moveTo( mappedP.x, mappedP.y );

  mapToScreenOrtho( gizmoX, canvas_width, canvas_height, mappedP );
  moveToScreenPosition( mappedP );

  context.lineTo( mappedP.x, mappedP.y );
  context.strokeStyle = RED;
  context.stroke();

  mapToScreenOrtho( origin, canvas_width, canvas_height, mappedP );
  moveToScreenPosition( mappedP );

  context.beginPath();
  context.moveTo( mappedP.x, mappedP.y );

  mapToScreenOrtho( gizmoY, canvas_width, canvas_height, mappedP );
  moveToScreenPosition( mappedP );

  context.lineTo( mappedP.x, mappedP.y );
  context.strokeStyle = GREEN;
  context.stroke();
}
