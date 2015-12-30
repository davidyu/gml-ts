declare module gml {
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
    interface Angle {
        toDegrees(): number;
        toRadians(): number;
        add(rhs: Angle): Angle;
        subtract(rhs: Angle): Angle;
        negate(): Angle;
        reduceToOneTurn(): Angle;
    }
    function fromRadians(rad: number): Angle;
    function fromDegrees(deg: number): Angle;
}
declare module gml {
    class Vector {
        v: Float32Array;
        size: number;
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
        normalize(): void;
        normalized: Vector;
        map(callback: (v: number) => number): Vector;
        toString(): string;
    }
}
declare module gml {
    class Matrix {
        v: Float32Array;
        rows: number;
        cols: number;
        constructor(rows: number, cols: number, args: Float32Array);
        constructor(rows: number, cols: number, args: number[]);
        constructor(rows: number, cols: number, ...args: number[]);
        private transpose_Float32Array(values, rows, cols);
        transpose(): Matrix;
        get(r: number, c: number): number;
        set(r: number, c: number, val: number): void;
        row(r: number): Vector;
        column(c: number): Vector;
        setRow(r: number, row: Vector): void;
        setColumn(c: number, col: Vector): void;
        swapRows(r1: number, r2: number): void;
        trace: number;
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
        m: Float32Array;
    }
}
declare module gml2d {
    class Vec2 extends gml.Vector {
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
        normalized: Vec2;
        cross(rhs: Vec2): number;
        map(callback: (v: number) => number): Vec2;
        static randomInCircle(radius?: number): Vec2;
        static zero: Vec2;
    }
}
declare module gml2d {
    class Vec3 extends gml.Vector {
        constructor(v: number[]);
        constructor(v: Float32Array);
        constructor(x: number, y: number, w: number);
        x: number;
        y: number;
        w: number;
        add(rhs: Vec3): Vec3;
        subtract(rhs: Vec3): Vec3;
        multiply(s: number): Vec3;
        divide(d: number): Vec3;
        negate(): Vec3;
        dot(rhs: Vec3): number;
        cross(rhs: Vec3): number;
        normalized: Vec3;
        map(callback: (v: number) => number): Vec3;
        static randomInCircle(radius?: number): Vec3;
        static randomPositionInCircle(radius?: number): Vec3;
        static zero: Vec3;
    }
}
declare module gml2d {
    class Mat3 extends gml.Matrix {
        constructor(args: Float32Array);
        constructor(args: number[]);
        constructor(r00: number, r01: number, tx: number, r10: number, r11: number, ty: number, m20: number, m21: number, m22: number);
        r00: number;
        r01: number;
        r10: number;
        r11: number;
        m20: number;
        r21: number;
        r22: number;
        tx: number;
        ty: number;
        rotation: gml.Angle;
        private rot_rad;
        sx: number;
        sy: number;
        row(r: number): Vec3;
        column(c: number): Vec3;
        multiply(rhs: Mat3): Mat3;
        multiply(s: number): Mat3;
        static identity(): Mat3;
        static fromRows(r1: Vec3, r2: Vec3, r3: Vec3): Mat3;
        static fromCols(c1: Vec3, c2: Vec3, c3: Vec3): Mat3;
    }
}
