// cached so we don't recompute these matrices every frame
var cached_v  = gml.Mat4.identity();
var cached_p  = gml.Mat4.identity();
var cached_vp = gml.Mat4.identity(); // view-perspective matrix

function setPerspective( fov, aspectRatio, near, far ) {
  cached_p = gml.makePerspective( fov, aspectRatio, near, far );
  gml.Mat4.matmul( cached_v, cached_p, cached_vp );
}

function setCamera( pos, aim, up, right ) {
  cached_v = gml.makeLookAt( pos, aim, up, right );
  gml.Mat4.matmul( cached_v, cached_p, cached_vp );
}

function mapToScreen( in_vertex, screenw, screenh, out_vertex ) {
  if ( out_vertex != null ) {
    gml.Mat4.transform( cached_vp, in_vertex, out_vertex );
    out_vertex.x *= screenw;
    out_vertex.y *= screenh;
    return;
  }

  let out = cached_vp.transform( in_vertex );
  out.x *= screenw;
  out.y *= screenh;

  return out;
}
