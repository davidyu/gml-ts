// cached so we don't recompute these matrices every frame
var cached_v  = gml.Mat4.identity();
var cached_p  = gml.Mat4.identity();
var cached_vp = gml.Mat4.identity(); // view-perspective matrix

// internal orbit controls
var orbitDistance = 10;
var orbitCenter = new gml.Vec4( 0, 0, 0, 1 );
var yaw = gml.fromDegrees( 0 );
var pitch = gml.fromDegrees( 0 );

function setPerspective( fov, aspectRatio, near, far ) {
  cached_p = gml.makePerspective( fov, aspectRatio, near, far );
  gml.Mat4.matmul( cached_p, cached_v, cached_vp );
}

function setCamera( pos, aim, up, right ) {
  cached_v = gml.makeLookAt( pos, aim, up, right );
  gml.Mat4.matmul( cached_p, cached_v, cached_vp );
}

const PAN_PIXEL_TO_RADIAN = 1/30;
function rotateCamera( dx, dy ) {
  this.yaw = this.yaw.add( gml.fromRadians( -dx * PAN_PIXEL_TO_RADIAN ).negate() ).reduceToOneTurn();
  this.pitch = this.pitch.add( gml.fromRadians( -dy * PAN_PIXEL_TO_RADIAN ) ).reduceToOneTurn();

  let baseAim = new gml.Vec4( 0, 0, -1, 0 );

  let rotY = gml.Mat4.rotateY( yaw );
  let rotRight = rotY.transform( gml.Vec4.right );

  let rotX = gml.Mat4.rotate( rotRight, pitch );
  let rotAim = rotX.transform( rotY.transform( baseAim ) ).normalized;
  let rotUp = rotRight.cross( rotAim );

  let rotPos = this.orbitCenter.add( rotAim.negate().multiply( orbitDistance ) );

  setCamera( rotPos, rotAim, rotUp, rotRight );
}

function mapToScreen( in_vertex, screenw, screenh, out_vertex ) {
  if ( out_vertex != null ) {
    gml.Mat4.transform( cached_vp, in_vertex, out_vertex );
    out_vertex.x = ( out_vertex.x + 1 ) * screenw / 2;
    out_vertex.y = ( out_vertex.y + 1 ) * screenh / 2;
    return;
  }

  let out = cached_vp.transform( in_vertex );
  out.x *= screenw;
  out.y *= screenh;

  return out;
}
