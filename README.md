# gml-ts

[![Build status](https://api.travis-ci.org/davidyu/gml-ts.svg)](https://travis-ci.org/davidyu/gml-ts/builds)

gml (game math library) for TypeScript. Under heavy development. [API documentation here](http://davidyu.github.io/gml/doc/ts).

GML provides separate interfaces for 2D and 3D math. The 2D version of GML provides methods uniquely useful for 2D games and demos, such as the [2D cross product](http://allenchou.net/2013/07/cross-product-of-2d-vectors/) and homogenous 3x3 matrices. The 3D version of GML will be more familiar to those who have used any sort of vector math libraries in the past. The 2D version of the API is distinguished by its `gml2d` container module:

```
// 2d API
let v2 = new gml2d.Vec2( 0, 0 );

// 3d API
let v4 = new gml.Vec4( 0, 0 );
```

Some methods (such as those pertaining to angles), are shared across the 2D and 3D API and are in the standard `gml` module:

```
let angle = gml.fromDegrees( 45 );
console.log( angle.toRadians() ); // -> 0.7853981633974483
```

## Using GML

To stay on the cutting-edge of GML, you can add it as a submodule to your projec: `git submodule add https://github.com/davidyu/gml-ts.git gml` and include everything under the `src` directory in your TypeScript project. However, this is not recommended as quite often I introduce breaking changes in the API. To use archived, frozen versions of GML, you can download the compiled `.js` and `.d.ts` files from the [releases page](https://github.com/davidyu/gml-ts/releases).

### Performance

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
