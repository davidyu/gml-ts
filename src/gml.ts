///<reference path = "angle.ts" />
///<reference path = "easing.ts" />
///<reference path = "vec.ts" />
///<reference path = "3d/vec2.ts" />
///<reference path = "3d/vec3.ts" />
///<reference path = "3d/vec4.ts" />
///<reference path = "mat.ts" />
///<reference path = "3d/mat3.ts" />
///<reference path = "3d/mat4.ts" />

// this is a hack for nodejs
declare var module: any;
if ( typeof module !== 'undefined' ) {
  module.exports = gml;
}
