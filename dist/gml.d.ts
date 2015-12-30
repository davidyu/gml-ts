declare module gml {
    /**
     * Construct Angles with gml.fromDegrees() or gml.fromRadians().
     */
    interface Angle {
        toDegrees(): number;
        toRadians(): number;
        add(rhs: Angle): Angle;
        subtract(rhs: Angle): Angle;
        negate(): Angle;
        /**
         * ensures the Angle is within one full turn. IE: between 0 and 360 degrees
         * or 0 and 2 PI radians
         */
        reduceToOneTurn(): Angle;
    }
    function fromRadians(rad: number): Angle;
    function fromDegrees(deg: number): Angle;
}
declare module gml {
    /**
     * Implements common easing methods (generally used) for animation.
     * All methods assume a normalized input t (time) between 0 and 1
     * and returns an output t' between 0 and 1.
     */
    class Easing {
        static QuadIn(t: number): number;
        static QuadOut(t: number): number;
        static QuadInOut(t: number): number;
        static CubicIn(t: number): number;
        static CubicOut(t: number): number;
        static CubicInOut(t: number): number;
    }
}
declare module gml {
    /**
     * Vector constructor sugar that curries the size parameter.
     *
     * usage:
     * <pre>
     *  new Vec(3)(x,y,z);
     *  new Vec(4)(a,b,c,d);
     *  new Vec(100)(x1,x2,...,x100);
     * </pre>
     */
    class Vec {
        constructor(size: number);
    }
    class Vector {
        /**
         * The raw contents of the vector, encoded as a Float32Array for WebGL.
         */
        v: Float32Array;
        size: number;
        /**
         * The generic vector constructor accepts three combinations of inputs:
         *
         * <pre>
         *  // its contents in the constructor parameters directly
         *  new Vector(2,x,y);
         *
         *  // its contents as an array
         *  new Vector(2,[x,y]);
         *
         *  // its contents as a Float32Array
         *  new Vector(2, new Float32Array([x,y]));
         * </pre>
         *
         * Regardless of the input type, it will convert the contents of the array
         * into a Float32Array.
         */
        constructor(size: number, args: Float32Array);
        constructor(size: number, args: number[]);
        constructor(size: number, ...args: number[]);
        add(rhs: Vector): Vector;
        subtract(rhs: Vector): Vector;
        multiply(s: number): Vector;
        divide(d: number): Vector;
        negate(): Vector;
        dot(rhs: Vector): number;
        equals(b: Vector): boolean;
        len: number;
        lensq: number;
        /**
         * NOTE: this alters the underlying vector. For construction of
         * a new normalized vector, use the vector.normalized property.
         */
        normalize(): void;
        unit(): Vector;
        normalized: Vector;
        map(callback: (v: number) => number): Vector;
        toString(): string;
    }
}
declare module gml {
    class Vec2 extends Vector {
        constructor(v: number[]);
        constructor(v: Float32Array);
        constructor(x: number, y: number);
        x: number;
        y: number;
        add(rhs: Vec2): Vec2;
        subtract(rhs: Vec2): Vec2;
        multiply(s: number): Vec2;
        divide(d: number): Vec2;
        negate(): Vec2;
        dot(rhs: Vec2): number;
        cross(rhs: Vec2): number;
        map(callback: (v: number) => number): Vec2;
    }
}
declare module gml {
    class Vec3 extends Vector {
        constructor(v: number[]);
        constructor(v: Float32Array);
        constructor(x: number, y: number, z: number);
        x: number;
        y: number;
        z: number;
        add(rhs: Vec3): Vec3;
        subtract(rhs: Vec3): Vec3;
        multiply(s: number): Vec3;
        divide(d: number): Vec3;
        negate(): Vec3;
        dot(rhs: Vec3): number;
        cross(rhs: Vec3): Vec3;
        normalized: Vec3;
        map(callback: (v: number) => number): Vec3;
    }
}
declare module gml {
    class Vec4 extends Vector {
        constructor(v: number[]);
        constructor(v: Float32Array);
        constructor(x: number, y: number, z: number, w: number);
        x: number;
        y: number;
        z: number;
        w: number;
        r: number;
        g: number;
        b: number;
        a: number;
        xyz: Vec3;
        xy: Vec2;
        add(rhs: Vec4): Vec4;
        subtract(rhs: Vec4): Vec4;
        multiply(s: number): Vec4;
        divide(d: number): Vec4;
        negate(): Vec4;
        dot(rhs: Vec4): number;
        cross(rhs: Vec4): Vec4;
        normalized: Vec4;
        map(callback: (v: number) => number): Vec4;
        static randomInSphere(radius?: number): Vec4;
        static randomPositionInSphere(radius?: number): Vec4;
        static origin: Vec4;
        static up: Vec4;
        static right: Vec4;
    }
}
declare module gml {
    /**
     * Matrix constructor sugar that curries the size parameters.
     *
     * usage:
     * <pre>
     *  new Matrix(3,3)(...);
     *  new Matrix(4,4)(...);
     *  new Matrix(100,10)(...);
     * </pre>
     */
    class Mat {
        constructor(r: number, c: number);
    }
    class Matrix {
        /**
         * The raw contents of the matrix, encoded as a Float32Array.
         * Note that this is stored in row-major order, so it cannot be
         * directly passed into WebGL uniform methods. Use the matrix.m
         * property, which returns a transposed Float32Array.
         */
        v: Float32Array;
        rows: number;
        cols: number;
        /**
         * The generic matrix constructor accepts three combinations of inputs:
         *
         * <pre>
         *  // its contents in the constructor parameters directly
         *  new Matrix(2,2,m00,m01,m10,m11);
         *
         *  // its contents as an array
         *  new Matrix(2,2,[m00,m01,m10,m11]);
         *
         *  // its contents as a Float32Array
         *  new Matrix(2,2,new Float32Array([m00,m01,m10,m11]));
         * </pre>
         *
         * Regardless of the input type, it will convert the contents of the array
         * into a Float32Array.
         *
         * Note that the contents are specified as a flattened row-major 2D array
         */
        constructor(rows: number, cols: number, args: Float32Array);
        constructor(rows: number, cols: number, args: number[]);
        constructor(rows: number, cols: number, ...args: number[]);
        private transpose_Float32Array(values, rows, cols);
        transpose(): Matrix;
        get(r: number, c: number): number;
        set(r: number, c: number, val: number): void;
        row(r: number): Vector;
        setRow(r: number, row: Vector): void;
        swapRows(r1: number, r2: number): void;
        column(c: number): Vector;
        trace: number;
        /**
         * @returns The LU decomposition of the matrix. If no such decomposition
         * exists, the l and u properties of the return object are both null.
         *
         * Implements the Doolittle algorithm.
         */
        lu(): {
            l: Matrix;
            u: Matrix;
        };
        determinant: number;
        add(rhs: Matrix): Matrix;
        subtract(rhs: Matrix): Matrix;
        multiply(rhs: Matrix): Matrix;
        multiply(s: number): Matrix;
        scalarmul(s: number): Matrix;
        static matmul(lhs: Matrix, rhs: Matrix): Matrix;
        static identity(size: number): Matrix;
        toString(): string;
        toWolframString(): string;
        /**
         * @returns The contents of the matrix, stored in column-major order and
         * encoded as a Float32Array.
         */
        m: Float32Array;
    }
}
declare module gml {
    class Mat3 extends Matrix {
        constructor(args: Float32Array);
        constructor(args: number[]);
        constructor(r00: number, r01: number, tx: number, r10: number, r11: number, ty: number, m20: number, m21: number, m22: number);
        r00: number;
        r01: number;
        r02: number;
        r10: number;
        r11: number;
        r12: number;
        r20: number;
        r21: number;
        r22: number;
        tx: number;
        ty: number;
        w: number;
        rotation: Angle;
        rot_raw: number;
        sx: number;
        sy: number;
        row(r: number): Vec3;
        column(c: number): Vec3;
        multiply(rhs: Mat3): Mat3;
        multiply(s: number): Mat3;
        toMat4(): Mat4;
        static identity(): Mat3;
    }
}
declare module gml {
    class Mat4 extends Matrix {
        constructor(args: Float32Array);
        constructor(args: number[]);
        constructor(r00: number, r01: number, r02: number, tx: number, r10: number, r11: number, r12: number, ty: number, r20: number, r21: number, r22: number, tz: number, m30: number, m31: number, m32: number, m33: number);
        r00: number;
        r01: number;
        r02: number;
        r10: number;
        r11: number;
        r12: number;
        r20: number;
        r21: number;
        r22: number;
        m30: number;
        m31: number;
        m32: number;
        m33: number;
        tx: number;
        ty: number;
        tz: number;
        w: number;
        row(r: number): Vec4;
        column(c: number): Vec4;
        setColumn(c: number, v: Vec4): void;
        translation: Vec4;
        scale: Vec3;
        multiply(rhs: Mat4): Mat4;
        multiply(s: number): Mat4;
        scalarmul(s: number): Mat4;
        subtract(rhs: Mat4): Mat4;
        add(rhs: Matrix): Mat4;
        transform(rhs: Vec4): Vec4;
        invert(): Mat4;
        transpose(): Mat4;
        mat3: Mat3;
        static identity(): Mat4;
        static rotateY(angle: Angle): Mat4;
        static rotateX(angle: Angle): Mat4;
        static rotateZ(angle: Angle): Mat4;
        static rotate(axis: Vec4, angle: Angle): Mat4;
        static translate(): Mat4;
    }
    function makeMat4FromRows(r1: Vec4, r2: Vec4, r3: Vec4, r4: Vec4): Mat4;
    function makeMat4FromCols(c1: Vec4, c2: Vec4, c3: Vec4, c4: Vec4): Mat4;
    function makePerspective(fov: Angle, aspectRatio: number, near: number, far: number): Mat4;
    function makeLookAt(pos: Vec4, aim: Vec4, up: Vec4, right: Vec4): Mat4;
}
declare var module: any;
