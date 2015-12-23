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
    class Degree implements Angle {
        v: number;
        constructor(deg: number);
        toDegrees(): number;
        toRadians(): number;
        add(rhs: Angle): Angle;
        subtract(rhs: Angle): Angle;
        negate(): Angle;
        reduceToOneTurn(): Angle;
        static zero: Angle;
    }
    class Radian implements Angle {
        static TWO_PI: number;
        v: number;
        constructor(rad: number);
        toRadians(): number;
        toDegrees(): number;
        add(rhs: Angle): Angle;
        subtract(rhs: Angle): Angle;
        negate(): Angle;
        reduceToOneTurn(): Angle;
        static zero: Angle;
    }
}
declare module gml {
    class Vec {
        constructor(size: number);
    }
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
    class Mat {
        constructor(r: number, c: number);
    }
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
        setRow(r: number, row: Vector): void;
        swapRows(r1: number, r2: number): void;
        column(c: number): Vector;
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
