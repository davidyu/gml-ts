///<reference path = "angle.ts" />
///<reference path = "easing.ts" />
///<reference path = "vec.ts" />
///<reference path = "vec2.ts" />
///<reference path = "vec3.ts" />
///<reference path = "vec4.ts" />
///<reference path = "mat.ts" />
///<reference path = "mat3.ts" />
///<reference path = "mat4.ts" />

// this is a hack for nodejs
declare var module: any;
if ( module != null ) {
  module.exports = gml;
}
