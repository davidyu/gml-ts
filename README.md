# gml-ts

[![Build status](https://api.travis-ci.org/davidyu/gml-ts.svg)](https://travis-ci.org/davidyu/gml-ts/builds)

gml (game math library) for TypeScript. Under heavy development. [API documentation here](http://davidyu.github.io/gml/doc/ts).

GML provides separate interfaces for 2D and 3D math. The 2D version of GML provides methods uniquely useful for 2D games and demos, such as the [2D cross product](http://allenchou.net/2013/07/cross-product-of-2d-vectors/) and homogenous 3x3 matrices. The 3D version of GML will be more familiar to those who have used any sort of vector math libraries in the past. The 2D version of the API is distinguished by its `gml2d` container module:

```
// 2d API
let v2 = new gml2d.Vec2( 0, 0 );

// 3d API
let v4 = new gml.Vec4( 0, 0, 0, 1 );
```

Some methods (such as those pertaining to angles), are shared across the 2D and 3D API and are in the standard `gml` module:

```
let angle = gml.fromDegrees( 45 );
console.log( angle.toRadians() ); // -> 0.7853981633974483
```

GML provides some syntactic sugar for accessing components of vectors and matrices:

```
let pos = new gml.Vec4( 20, 30, 40, 1 );
console.log( pos.x ) // -> 20;
console.log( pos.y ) // -> 30;
console.log( pos.z ) // -> 40;
console.log( pos.w ) // -> 1;

let foreground = new gml.Vec4( 57, 30, 255, 128 );
console.log( foreground.r ); // -> 57
console.log( foreground.g ); // -> 30
console.log( foreground.b ); // -> 255
console.log( foreground.a ); // -> 128

let id = new gml.Mat4( 1, 0, 0, 0
                     , 0, 1, 0, 0
                     , 0, 0, 1, 0
                     , 0, 0, 0, 1 );

console.log( id.r00 ); // -> 1
console.log( id.r01 ); // -> 0
console.log( id.r02 ); // -> 0
console.log( id.r03 ); // -> 0
console.log( id.r10 ); // -> 0
console.log( id.r11 ); // -> 1
console.log( id.r12 ); // -> 0
console.log( id.r13 ); // -> 0
console.log( id.r20 ); // -> 0
console.log( id.r21 ); // -> 0
console.log( id.r22 ); // -> 1
console.log( id.r23 ); // -> 0
console.log( id.m30 ); // -> 0
console.log( id.m31 ); // -> 0
console.log( id.m32 ); // -> 0
console.log( id.m33 ); // -> 1
```

The full list of property accessors are available in the [API docs](http://davidyu.github.io/gml/doc/ts).

## Using GML

To stay on the cutting-edge of GML, you can add it as a submodule (provided your project is also tracked by git): `git submodule add https://github.com/davidyu/gml-ts.git gml`, and include everything under the `src` directory. However, this is not recommended as quite often I introduce breaking changes in the API. To use archived, frozen versions of GML, you can download the compiled `.js` and `.d.ts` files from the [releases page](https://github.com/davidyu/gml-ts/releases).

## Performance

For the most part, the algorithms in GML is fairly optimized. However, since object creation can result in significant performance penalties when garbage collection is invoked, we provide static, in-place methods for vector and matrix operations:

```
// for Vec4:
static add(lhs: Vec4, rhs: Vec4, out: Vec4): Vec4;
static subtract(lhs: Vec4, rhs: Vec4, out: Vec4): Vec4;
static multiply(lhs: Vec4, s: number, out: Vec4): Vec4;
static divide(lhs: Vec4, d: number, out: Vec4): Vec4;
static negate(lhs: Vec4, out: Vec4): Vec4;

// for Mat4:
static matmul(lhs: Mat4, rhs: Mat4): Mat4;
```

These are encouraged over their non-static pure methods that return new objects, especially in tight loops or parts of code that execute every frame.

## WebGL

The 3D API of GML is designed with WebGL in mind, and provides many methods useful for real-time applications in WebGL:

```
// create view matrix
let camera = gml.makeLookAt( position, aim, up, right );

// create perspective projection matrix
let perspective = gml.makePerspective( gml.fromDegrees( verticalFOV ), viewportW / viewportH, nearZ, farZ );

// pass projection and view matrices into WebGL
// the .m property accessor inverts the matrix to be column-major to conform to GL specs
gl.uniformMatrix4fv( shaderVariables.uView, false, camera.m );
gl.uniformMatrix4fv( shaderVariables.uPerspective, false, perspective.m );
```
