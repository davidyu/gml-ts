// simple angle interface with explicit constructors
var gml;
(function (gml) {
    function fromRadians(rad) {
        return new Radian(rad);
    }
    gml.fromRadians = fromRadians;
    function fromDegrees(deg) {
        return new Degree(deg);
    }
    gml.fromDegrees = fromDegrees;
    var Degree = (function () {
        function Degree(deg) {
            this.v = deg;
        }
        Degree.prototype.toDegrees = function () {
            return this.v;
        };
        Degree.prototype.toRadians = function () {
            return this.v * Math.PI / 180;
        };
        Degree.prototype.add = function (rhs) {
            return fromDegrees(this.v + rhs.toDegrees());
        };
        Degree.prototype.subtract = function (rhs) {
            return fromDegrees(this.v - rhs.toDegrees());
        };
        Degree.prototype.negate = function () {
            return fromDegrees(-this.v);
        };
        Degree.prototype.reduceToOneTurn = function () {
            if (this.v >= 360) {
                return fromDegrees(this.v - 360 * Math.floor(this.v / 360));
            }
            else if (this.v < 0) {
                return fromDegrees(this.v + 360 * Math.ceil(-this.v / 360));
            }
            else {
                return this;
            }
        };
        Object.defineProperty(Degree, "zero", {
            get: function () {
                return new Degree(0);
            },
            enumerable: true,
            configurable: true
        });
        return Degree;
    })();
    gml.Degree = Degree;
    var Radian = (function () {
        function Radian(rad) {
            this.v = rad;
        }
        Object.defineProperty(Radian, "TWO_PI", {
            get: function () { return 6.283185307179586; },
            enumerable: true,
            configurable: true
        });
        Radian.prototype.toRadians = function () {
            return this.v;
        };
        Radian.prototype.toDegrees = function () {
            return this.v * 180 / Math.PI;
        };
        Radian.prototype.add = function (rhs) {
            return fromRadians(this.v + rhs.toRadians());
        };
        Radian.prototype.subtract = function (rhs) {
            return fromRadians(this.v - rhs.toRadians());
        };
        Radian.prototype.negate = function () {
            return fromRadians(-this.v);
        };
        Radian.prototype.reduceToOneTurn = function () {
            if (this.v >= Radian.TWO_PI) {
                return fromRadians(this.v - Radian.TWO_PI * Math.floor(this.v / Radian.TWO_PI));
            }
            else if (this.v < 0) {
                return fromRadians(this.v + Radian.TWO_PI * Math.ceil(-this.v / Radian.TWO_PI));
            }
            else {
                return this;
            }
        };
        Object.defineProperty(Radian, "zero", {
            get: function () {
                return new Radian(0);
            },
            enumerable: true,
            configurable: true
        });
        return Radian;
    })();
    gml.Radian = Radian;
})(gml || (gml = {}));
var gml;
(function (gml) {
    var Easing = (function () {
        function Easing() {
        }
        Easing.QuadIn = function (t) {
            return t * t;
        };
        Easing.QuadOut = function (t) {
            return -t * (t - 2);
        };
        Easing.QuadInOut = function (t) {
            if (t < 0.5) {
                return 2 * t * t;
            }
            else {
                var _t = (t - 0.5) * 2;
                return (-_t * (_t - 2)) / 2 + 0.5;
            }
        };
        Easing.CubicIn = function (t) {
            return t * t * t;
        };
        Easing.CubicOut = function (t) {
            var _t = t - 1;
            return _t * _t * _t + 1;
        };
        Easing.CubicInOut = function (t) {
            if (t < 0.5) {
                return 4 * t * t;
            }
            else {
                var _t = ((t - 0.5) * 2) - 1;
                return (_t * _t * _t + 1) / 2 + 0.5;
            }
        };
        return Easing;
    })();
    gml.Easing = Easing;
})(gml || (gml = {}));
var gml;
(function (gml) {
    var Vec = (function () {
        function Vec(size) {
            return function () {
                var array = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    array[_i - 0] = arguments[_i];
                }
                return new Vector(size, array);
            };
        }
        return Vec;
    })();
    gml.Vec = Vec;
    var Vector = (function () {
        function Vector(size) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            this.size = size;
            if (args.length === 1) {
                if (args[0] instanceof Float32Array) {
                    this.v = args[0];
                }
                else if (args[0] instanceof Array) {
                    this.v = new Float32Array(args[0]);
                }
            }
            else {
                this.v = new Float32Array(args);
            }
            if (this.v.length != this.size) {
                console.warn("input array " + args + " is not " + this.size + " elements long!");
            }
        }
        Vector.prototype.add = function (rhs) {
            if (this.size != rhs.size) {
                console.warn("rhs not " + this.size + " elements long!");
                return null;
            }
            var sum = [];
            for (var i = 0; i < this.size; i++) {
                sum.push(this.v[i] + rhs.v[i]);
            }
            return new Vector(this.size, sum);
        };
        Vector.prototype.subtract = function (rhs) {
            if (this.size != rhs.size) {
                console.warn("rhs not " + this.size + " elements long!");
                return null;
            }
            var diff = [];
            for (var i = 0; i < this.size; i++) {
                diff.push(this.v[i] - rhs.v[i]);
            }
            return new Vector(this.size, diff);
        };
        Vector.prototype.multiply = function (s) {
            var scaled = [];
            for (var i = 0; i < this.size; i++) {
                scaled.push(this.v[i] * s);
            }
            return new Vector(this.size, scaled);
        };
        Vector.prototype.divide = function (d) {
            var divided = [];
            for (var i = 0; i < this.size; i++) {
                divided.push(this.v[i] / d);
            }
            return new Vector(this.size, divided);
        };
        Vector.prototype.negate = function () {
            var negated = [];
            for (var i = 0; i < this.size; i++) {
                negated.push(-this.v[i]);
            }
            return new Vector(this.size, negated);
        };
        Vector.prototype.dot = function (rhs) {
            if (this.size != rhs.size) {
                console.warn("rhs not " + this.size + " elements long!");
                return null;
            }
            var dp = 0;
            for (var i = 0; i < this.size; i++) {
                dp += this.v[0] * rhs.v[0];
            }
        };
        Vector.prototype.equals = function (b) {
            if (this.size != b.size)
                return false;
            for (var i = 0; i < this.size; i++) {
                if (this.v[i] != b.v[i])
                    return false;
            }
            return true;
        };
        Object.defineProperty(Vector.prototype, "len", {
            get: function () {
                return Math.sqrt(this.lensq);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "lensq", {
            get: function () {
                return this.v.reduce(function (acc, c) {
                    return acc + c * c;
                }, 0);
            },
            enumerable: true,
            configurable: true
        });
        Vector.prototype.normalize = function () {
            var l = this.len;
            this.v = this.v.map(function (v) {
                return v / l;
            });
        };
        Vector.prototype.unit = function () {
            var l = this.len;
            var vs = [];
            for (var i = 0; i < this.size; i++) {
                vs.push(this.v[i] / l);
            }
            return new Vector(vs.unshift(this.size));
        };
        Object.defineProperty(Vector.prototype, "normalized", {
            get: function () {
                return this.unit();
            },
            enumerable: true,
            configurable: true
        });
        Vector.prototype.map = function (callback) {
            return new Vector(this.size, this.v.map(callback));
        };
        Vector.prototype.toString = function () {
            var str = "";
            for (var i = 0; i < this.size; i++) {
                str += this.v[i] + ",";
            }
            return str.slice(0, -1);
        };
        return Vector;
    })();
    gml.Vector = Vector;
})(gml || (gml = {}));
///<reference path="../vec.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gml;
(function (gml) {
    var Vec2 = (function (_super) {
        __extends(Vec2, _super);
        function Vec2() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length == 2) {
                _super.call(this, 2, args[0], args[1]);
            }
            else if (args.length == 1) {
                _super.call(this, 2, args[0]);
            }
        }
        Object.defineProperty(Vec2.prototype, "x", {
            get: function () {
                return this.v[0];
            },
            set: function (x) {
                this.v[0] = x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec2.prototype, "y", {
            get: function () {
                return this.v[1];
            },
            set: function (y) {
                this.v[1] = y;
            },
            enumerable: true,
            configurable: true
        });
        Vec2.prototype.add = function (rhs) {
            return new Vec2(this.x + rhs.x, this.y + rhs.y);
        };
        Vec2.prototype.subtract = function (rhs) {
            return new Vec2(this.x - rhs.x, this.y - rhs.y);
        };
        Vec2.prototype.multiply = function (s) {
            return new Vec2(this.x * s, this.y * s);
        };
        Vec2.prototype.divide = function (d) {
            return new Vec2(this.x / d, this.y / d);
        };
        Vec2.prototype.negate = function () {
            return new Vec2(-this.x, -this.y);
        };
        Vec2.prototype.dot = function (rhs) {
            return this.x * rhs.x + this.y * rhs.y;
        };
        Vec2.prototype.cross = function (rhs) {
            return this.x * rhs.y - this.y * rhs.x;
        };
        Vec2.prototype.map = function (callback) {
            return new Vec2(this.v.map(callback));
        };
        return Vec2;
    })(gml.Vector);
    gml.Vec2 = Vec2;
})(gml || (gml = {}));
///<reference path="../vec.ts"/>
var gml;
(function (gml) {
    var Vec3 = (function (_super) {
        __extends(Vec3, _super);
        function Vec3() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length == 3) {
                _super.call(this, 3, args[0], args[1], args[2]);
            }
            else if (args.length == 1) {
                _super.call(this, 3, args[0]);
            }
        }
        Object.defineProperty(Vec3.prototype, "x", {
            get: function () {
                return this.v[0];
            },
            set: function (x) {
                this.v[0] = x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec3.prototype, "y", {
            get: function () {
                return this.v[1];
            },
            set: function (y) {
                this.v[1] = y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec3.prototype, "z", {
            get: function () {
                return this.v[2];
            },
            set: function (z) {
                this.v[2] = z;
            },
            enumerable: true,
            configurable: true
        });
        Vec3.prototype.add = function (rhs) {
            return new Vec3(this.x + rhs.x, this.y + rhs.y, this.z + rhs.z);
        };
        Vec3.prototype.subtract = function (rhs) {
            return new Vec3(this.x - rhs.x, this.y - rhs.y, this.z - rhs.z);
        };
        Vec3.prototype.multiply = function (s) {
            return new Vec3(this.x * s, this.y * s, this.z * s);
        };
        Vec3.prototype.divide = function (d) {
            return new Vec3(this.x / d, this.y / d, this.z / d);
        };
        Vec3.prototype.negate = function () {
            return new Vec3(-this.x, -this.y, -this.z);
        };
        Vec3.prototype.dot = function (rhs) {
            return this.x * rhs.x + this.y * rhs.y + this.z * rhs.z;
        };
        Vec3.prototype.cross = function (rhs) {
            return new Vec3(this.y * rhs.z - this.z * rhs.y, this.z * rhs.x - this.x * rhs.z, this.x * rhs.y - this.y * rhs.x);
        };
        Object.defineProperty(Vec3.prototype, "normalized", {
            get: function () {
                var len = this.len;
                return new Vec3(this.x / len, this.y / len, this.z / len);
            },
            enumerable: true,
            configurable: true
        });
        Vec3.prototype.map = function (callback) {
            return new Vec3(this.v.map(callback));
        };
        return Vec3;
    })(gml.Vector);
    gml.Vec3 = Vec3;
})(gml || (gml = {}));
/// <reference path='../vec.ts'/>
var gml;
(function (gml) {
    var Vec4 = (function (_super) {
        __extends(Vec4, _super);
        function Vec4() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length == 4) {
                _super.call(this, 4, args[0], args[1], args[2], args[3]);
            }
            else if (args.length == 1) {
                _super.call(this, 4, args[0]);
            }
        }
        Object.defineProperty(Vec4.prototype, "x", {
            get: function () {
                return this.v[0];
            },
            set: function (x) {
                this.v[0] = x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec4.prototype, "y", {
            get: function () {
                return this.v[1];
            },
            set: function (y) {
                this.v[1] = y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec4.prototype, "z", {
            get: function () {
                return this.v[2];
            },
            set: function (z) {
                this.v[2] = z;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec4.prototype, "w", {
            get: function () {
                return this.v[3];
            },
            set: function (w) {
                this.v[3] = w;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec4.prototype, "r", {
            get: function () {
                return this.v[0];
            },
            set: function (r) {
                this.v[0] = r;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec4.prototype, "g", {
            get: function () {
                return this.v[1];
            },
            set: function (g) {
                this.v[1] = g;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec4.prototype, "b", {
            get: function () {
                return this.v[2];
            },
            set: function (b) {
                this.v[2] = b;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec4.prototype, "a", {
            get: function () {
                return this.v[3];
            },
            set: function (a) {
                this.v[3] = a;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec4.prototype, "xyz", {
            get: function () {
                return new gml.Vec3(this.x, this.y, this.z);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec4.prototype, "xy", {
            get: function () {
                return new gml.Vec2(this.x, this.y);
            },
            enumerable: true,
            configurable: true
        });
        Vec4.prototype.add = function (rhs) {
            return new Vec4(this.x + rhs.x, this.y + rhs.y, this.z + rhs.z, this.w + rhs.w);
        };
        Vec4.prototype.subtract = function (rhs) {
            return new Vec4(this.x - rhs.x, this.y - rhs.y, this.z - rhs.z, this.w - rhs.w);
        };
        Vec4.prototype.multiply = function (s) {
            return new Vec4(this.x * s, this.y * s, this.z * s, this.w * s);
        };
        Vec4.prototype.divide = function (d) {
            return new Vec4(this.x / d, this.y / d, this.z / d, this.w / d);
        };
        Vec4.prototype.negate = function () {
            return new Vec4(-this.x, -this.y, -this.z, -this.w);
        };
        Vec4.prototype.dot = function (rhs) {
            return this.x * rhs.x + this.y * rhs.y + this.z * rhs.z + this.w * rhs.w;
        };
        Vec4.prototype.cross = function (rhs) {
            return new Vec4(this.y * rhs.z - this.z * rhs.y, this.z * rhs.x - this.x * rhs.z, this.x * rhs.y - this.y * rhs.x, 0);
        };
        Object.defineProperty(Vec4.prototype, "normalized", {
            get: function () {
                var len = this.len;
                return new Vec4(this.x / len, this.y / len, this.z / len, this.w / len);
            },
            enumerable: true,
            configurable: true
        });
        Vec4.prototype.map = function (callback) {
            return new Vec4(this.v.map(callback));
        };
        Vec4.randomInSphere = function (radius) {
            if (radius === void 0) { radius = 1; }
            return new Vec4(Math.random(), Math.random(), Math.random(), 0).normalized.multiply(radius);
        };
        Vec4.randomPositionInSphere = function (radius) {
            if (radius === void 0) { radius = 1; }
            var random = new Vec4(Math.random(), Math.random(), Math.random(), 0).normalized.multiply(radius);
            random.w = 1;
            return random;
        };
        Object.defineProperty(Vec4, "origin", {
            get: function () {
                return new Vec4(0, 0, 0, 1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec4, "up", {
            get: function () {
                return new Vec4(0, 1, 0, 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec4, "right", {
            get: function () {
                return new Vec4(1, 0, 0, 0);
            },
            enumerable: true,
            configurable: true
        });
        return Vec4;
    })(gml.Vector);
    gml.Vec4 = Vec4;
})(gml || (gml = {}));
///<reference path="vec.ts"/>
var gml;
(function (gml) {
    var Mat = (function () {
        function Mat(r, c) {
            return function () {
                var values = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    values[_i - 0] = arguments[_i];
                }
                return new Matrix(r, c, values);
            };
        }
        return Mat;
    })();
    gml.Mat = Mat;
    var Matrix = (function () {
        function Matrix(rows, cols) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this.rows = rows;
            this.cols = cols;
            if (args.length == 1) {
                if (args[0] instanceof Float32Array) {
                    this.v = args[0];
                }
                else if (args[0] instanceof Array) {
                    this.v = new Float32Array(args[0]);
                }
            }
            else {
                this.v = new Float32Array(args);
            }
            if (this.v.length != this.rows * this.cols) {
                console.warn("input values " + args + " is not " + this.rows * this.cols + " elements long!");
            }
        }
        Matrix.prototype.transpose_Float32Array = function (values, rows, cols) {
            var out = new Float32Array(rows * cols);
            for (var i = 0; i < cols; i++) {
                for (var j = 0; j < rows; j++) {
                    out[i * cols + j] = values[j * cols + i];
                }
            }
            return out;
        };
        Matrix.prototype.transpose = function () {
            return new Matrix(this.cols, this.rows, this.transpose_Float32Array(this.v, this.rows, this.cols));
        };
        Matrix.prototype.get = function (r, c) {
            return this.v[r * this.cols + c];
        };
        Matrix.prototype.set = function (r, c, val) {
            this.v[r * this.cols + c] = val;
        };
        Matrix.prototype.row = function (r) {
            var row = [];
            for (var i = 0; i < this.cols; i++) {
                row.push(this.get(r, i));
            }
            return new gml.Vector(this.cols, row);
        };
        Matrix.prototype.setRow = function (r, row) {
            for (var i = 0; i < this.cols; i++) {
                this.set(r, i, row.v[i]);
            }
        };
        Matrix.prototype.swapRows = function (r1, r2) {
            var row1 = this.row(r1);
            var row2 = this.row(r2);
            this.setRow(r2, row1);
            this.setRow(r1, row2);
        };
        Matrix.prototype.column = function (c) {
            var column = [];
            for (var i = 0; i < this.rows; i++) {
                column.push(this.get(i, c));
            }
            return new gml.Vector(this.rows, column);
        };
        Object.defineProperty(Matrix.prototype, "trace", {
            get: function () {
                if (this.rows != this.cols) {
                    console.warn("matrix not square, cannot compute trace!");
                    return 0;
                }
                var tr = 0;
                for (var i = 0; i < this.rows; i++) {
                    tr += this.get(i, i);
                }
                return tr;
            },
            enumerable: true,
            configurable: true
        });
        Matrix.prototype.lu = function () {
            if (this.rows != this.cols) {
                console.warn("matrix not square; cannot perform LU decomposition!");
                return { l: null, u: null };
            }
            var l = Matrix.identity(this.rows);
            var u = new Matrix(this.rows, this.cols, this.v);
            var size = this.rows;
            for (var n = 0; n < size; n++) {
                var l_i = Matrix.identity(size);
                var l_i_inv = Matrix.identity(size);
                if (u.get(n, n) == 0) {
                    var success = false;
                    for (var j = n + 1; j < size; j++) {
                        if (u.get(j, n) != 0) {
                            u.swapRows(n, j);
                            success = true;
                            break;
                        }
                    }
                    if (!success) {
                        console.warn("matrix is singular; cannot perform LU decomposition!");
                        return { l: null, u: null };
                    }
                }
                for (var i = n + 1; i < size; i++) {
                    var l_i_n = -u.get(i, n) / u.get(n, n);
                    l_i.set(i, n, l_i_n);
                    l_i_inv.set(i, n, -l_i_n);
                }
                l = l.multiply(l_i_inv);
                u = l_i.multiply(u);
            }
            return { l: l, u: u };
        };
        Object.defineProperty(Matrix.prototype, "determinant", {
            get: function () {
                if (this.rows != this.cols) {
                    console.warn("matrix not square, cannot perform LU decomposition!");
                    return 0;
                }
                var _a = this.lu(), l = _a.l, u = _a.u;
                if (l == null || u == null) {
                    return 0;
                }
                var det = 1;
                for (var i = 0; i < this.rows; i++) {
                    det *= u.get(i, i);
                }
                return det;
            },
            enumerable: true,
            configurable: true
        });
        Matrix.prototype.add = function (rhs) {
            var vs = [];
            var rvs = rhs.v;
            for (var i = 0; i < this.v.length; i++) {
                vs.push(this.v[i] + rvs[i]);
            }
            return new Matrix(this.rows, this.cols, vs);
        };
        Matrix.prototype.subtract = function (rhs) {
            var vs = [];
            var rvs = rhs.v;
            for (var i = 0; i < this.v.length; i++) {
                vs.push(this.v[i] - rvs[i]);
            }
            return new Matrix(this.rows, this.cols, vs);
        };
        Matrix.prototype.multiply = function (arg) {
            if (arg instanceof Matrix) {
                return Matrix.matmul(this, arg);
            }
            else {
                return this.scalarmul(arg);
            }
        };
        Matrix.prototype.scalarmul = function (s) {
            var vs = [];
            for (var i = 0; i < this.v.length; i++) {
                vs.push(this.v[i] * s);
            }
            return new Matrix(this.rows, this.cols, vs);
        };
        Matrix.matmul = function (lhs, rhs) {
            if (lhs.rows != rhs.cols) {
                console.warn("lhs and rhs incompatible for matrix multiplication!");
                return null;
            }
            var out = [];
            for (var i = 0; i < lhs.rows; i++) {
                for (var j = 0; j < rhs.cols; j++) {
                    var sum = 0;
                    for (var k = 0; k < lhs.cols; k++) {
                        sum += lhs.get(i, k) * rhs.get(k, j);
                    }
                    out[i * lhs.cols + j] = sum;
                }
            }
            return new Matrix(lhs.rows, rhs.cols, out);
        };
        Matrix.identity = function (size) {
            var v = [];
            for (var i = 0; i < size; i++) {
                for (var j = 0; j < size; j++) {
                    if (i == j)
                        v.push(1);
                    else
                        v.push(0);
                }
            }
            return new Matrix(size, size, v);
        };
        Matrix.prototype.toString = function () {
            var str = "";
            for (var i = 0; i < this.rows; i++) {
                str += "\n\t";
                for (var j = 0; j < this.cols; j++) {
                    var v = this.get(i, j);
                    str += v.toPrecision(8) + "\t";
                }
                str = str.slice(0, -1);
                str += "\n";
            }
            str = str.slice(0, -1);
            str += "\n";
            return str;
        };
        Matrix.prototype.toWolframString = function () {
            var str = "{";
            for (var i = 0; i < this.rows; i++) {
                str += "{";
                for (var j = 0; j < this.cols; j++) {
                    str += this.get(i, j) + ",";
                }
                str = str.slice(0, -1);
                str += "},";
            }
            str = str.slice(0, -1);
            str += "}";
            return str;
        };
        Object.defineProperty(Matrix.prototype, "m", {
            get: function () {
                return this.transpose_Float32Array(this.v, this.rows, this.cols);
            },
            enumerable: true,
            configurable: true
        });
        return Matrix;
    })();
    gml.Matrix = Matrix;
})(gml || (gml = {}));
///<reference path="../mat.ts"/>
var gml;
(function (gml) {
    var Mat3 = (function (_super) {
        __extends(Mat3, _super);
        function Mat3() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this, 3, 3, args);
        }
        Object.defineProperty(Mat3.prototype, "r00", {
            get: function () {
                return this.get(0, 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat3.prototype, "r01", {
            get: function () {
                return this.get(0, 1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat3.prototype, "r02", {
            get: function () {
                return this.get(0, 2);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat3.prototype, "r10", {
            get: function () {
                return this.get(1, 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat3.prototype, "r11", {
            get: function () {
                return this.get(1, 1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat3.prototype, "r12", {
            get: function () {
                return this.get(1, 2);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat3.prototype, "r20", {
            get: function () {
                return this.get(2, 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat3.prototype, "r21", {
            get: function () {
                return this.get(2, 1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat3.prototype, "r22", {
            get: function () {
                return this.get(2, 2);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat3.prototype, "tx", {
            get: function () {
                return this.get(0, 2);
            },
            set: function (v) {
                this.set(0, 2, v);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat3.prototype, "ty", {
            get: function () {
                return this.get(1, 2);
            },
            set: function (v) {
                this.set(1, 2, v);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat3.prototype, "w", {
            get: function () {
                return this.get(2, 2);
            },
            set: function (v) {
                this.set(2, 2, v);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat3.prototype, "rotation", {
            get: function () {
                var a = this.get(0, 0);
                var b = this.get(0, 1);
                if (a < 0) {
                    return gml.fromRadians(Math.atan(b / a) + Math.PI);
                }
                else {
                    return gml.fromRadians(Math.atan(b / a));
                }
            },
            set: function (v) {
                var rad = v.toRadians();
                var sx = this.sx;
                var sy = this.sy;
                this.set(0, 0, sx * Math.cos(rad));
                this.set(0, 1, -sx * Math.sin(rad));
                this.set(1, 0, sy * Math.sin(rad));
                this.set(1, 1, sy * Math.cos(rad));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat3.prototype, "rot_raw", {
            get: function () {
                var a = this.get(0, 0);
                var b = this.get(0, 1);
                if (a < 0) {
                    return Math.atan(b / a) + Math.PI;
                }
                else {
                    return Math.atan(b / a);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat3.prototype, "sx", {
            get: function () {
                var a = this.get(0, 0);
                var b = this.get(0, 1);
                return Math.sqrt(a * a + b * b);
            },
            set: function (v) {
                var rad = this.rot_raw;
                this.set(0, 0, v * Math.cos(rad));
                this.set(0, 1, -v * Math.sin(rad));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat3.prototype, "sy", {
            get: function () {
                var c = this.get(1, 0);
                var d = this.get(1, 1);
                return Math.sqrt(c * c + d * d);
            },
            set: function (v) {
                var rad = this.rot_raw;
                this.set(1, 0, v * Math.sin(rad));
                this.set(1, 1, v * Math.cos(rad));
            },
            enumerable: true,
            configurable: true
        });
        Mat3.prototype.row = function (r) {
            var row = [];
            for (var i = 0; i < 3; i++) {
                row.push(this.get(r, i));
            }
            return new gml.Vec3(row);
        };
        Mat3.prototype.column = function (c) {
            var column = [];
            for (var i = 0; i < 3; i++) {
                column.push(this.get(i, c));
            }
            return new gml.Vec3(column);
        };
        Mat3.prototype.multiply = function (arg) {
            var m = _super.prototype.multiply.call(this, arg);
            return new Mat3(m.m);
        };
        Mat3.prototype.toMat4 = function () {
            return new gml.Mat4(this.r00, this.r01, this.r02, 0, this.r10, this.r11, this.r12, 0, this.r20, this.r21, this.r22, 0, 0, 0, 0, 1);
        };
        Mat3.identity = function () {
            return new Mat3(1, 0, 0, 0, 1, 0, 0, 0, 1);
        };
        return Mat3;
    })(gml.Matrix);
    gml.Mat3 = Mat3;
})(gml || (gml = {}));
///<reference path="../mat.ts"/>
var gml;
(function (gml) {
    var Mat4 = (function (_super) {
        __extends(Mat4, _super);
        function Mat4() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length === 1) {
                _super.call(this, 4, 4, args[0]);
            }
            else {
                _super.call(this, 4, 4, args);
            }
        }
        Object.defineProperty(Mat4.prototype, "r00", {
            get: function () {
                return this.get(0, 0);
            },
            set: function (v) {
                this.set(0, 0, v);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat4.prototype, "r01", {
            get: function () {
                return this.get(0, 1);
            },
            set: function (v) {
                this.set(0, 1, v);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat4.prototype, "r02", {
            get: function () {
                return this.get(0, 2);
            },
            set: function (v) {
                this.set(0, 2, v);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat4.prototype, "r10", {
            get: function () {
                return this.get(1, 0);
            },
            set: function (v) {
                this.set(1, 0, v);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat4.prototype, "r11", {
            get: function () {
                return this.get(1, 1);
            },
            set: function (v) {
                this.set(1, 1, v);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat4.prototype, "r12", {
            get: function () {
                return this.get(1, 2);
            },
            set: function (v) {
                this.set(1, 2, v);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat4.prototype, "r20", {
            get: function () {
                return this.get(2, 0);
            },
            set: function (v) {
                this.set(2, 0, v);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat4.prototype, "r21", {
            get: function () {
                return this.get(2, 1);
            },
            set: function (v) {
                this.set(2, 1, v);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat4.prototype, "r22", {
            get: function () {
                return this.get(2, 2);
            },
            set: function (v) {
                this.set(2, 2, v);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat4.prototype, "m30", {
            get: function () {
                return this.get(3, 0);
            },
            set: function (v) {
                this.set(3, 0, v);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat4.prototype, "m31", {
            get: function () {
                return this.get(3, 1);
            },
            set: function (v) {
                this.set(3, 1, v);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat4.prototype, "m32", {
            get: function () {
                return this.get(3, 2);
            },
            set: function (v) {
                this.set(3, 2, v);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat4.prototype, "m33", {
            get: function () {
                return this.get(3, 3);
            },
            set: function (v) {
                this.set(3, 3, v);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat4.prototype, "tx", {
            get: function () {
                return this.get(0, 3);
            },
            set: function (v) {
                this.set(0, 3, v);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat4.prototype, "ty", {
            get: function () {
                return this.get(1, 3);
            },
            set: function (v) {
                this.set(1, 3, v);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat4.prototype, "tz", {
            get: function () {
                return this.get(2, 3);
            },
            set: function (v) {
                this.set(2, 3, v);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat4.prototype, "w", {
            get: function () {
                return this.get(3, 3);
            },
            set: function (v) {
                this.set(3, 3, v);
            },
            enumerable: true,
            configurable: true
        });
        Mat4.prototype.row = function (r) {
            var row = [];
            for (var i = 0; i < 4; i++) {
                row.push(this.get(r, i));
            }
            return new gml.Vec4(row);
        };
        Mat4.prototype.column = function (c) {
            var column = [];
            for (var i = 0; i < 4; i++) {
                column.push(this.get(i, c));
            }
            return new gml.Vec4(column);
        };
        Mat4.prototype.setColumn = function (c, v) {
            for (var i = 0; i < 4; i++) {
                this.set(i, c, v.v[i]);
            }
        };
        Object.defineProperty(Mat4.prototype, "translation", {
            get: function () {
                return this.column(3);
            },
            set: function (t) {
                this.setColumn(3, t);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mat4.prototype, "scale", {
            get: function () {
                return new gml.Vec3(this.get(0, 0), this.get(1, 1), this.get(2, 2));
            },
            set: function (s) {
                this.set(0, 0, s.x);
                this.set(1, 1, s.y);
                this.set(2, 2, s.z);
            },
            enumerable: true,
            configurable: true
        });
        Mat4.prototype.multiply = function (arg) {
            var m = _super.prototype.multiply.call(this, arg);
            return new Mat4(m.v);
        };
        Mat4.prototype.scalarmul = function (s) {
            var m = _super.prototype.scalarmul.call(this, s);
            return new Mat4(m.v);
        };
        Mat4.prototype.subtract = function (rhs) {
            var m = _super.prototype.subtract.call(this, rhs);
            return new Mat4(m.v);
        };
        Mat4.prototype.add = function (rhs) {
            var m = _super.prototype.add.call(this, rhs);
            return new Mat4(m.v);
        };
        Mat4.prototype.transform = function (rhs) {
            return new gml.Vec4(this.r00 * rhs.x + this.r01 * rhs.y + this.r02 * rhs.z + this.tx * rhs.w, this.r10 * rhs.x + this.r11 * rhs.y + this.r12 * rhs.z + this.ty * rhs.w, this.r20 * rhs.x + this.r21 * rhs.y + this.r22 * rhs.z + this.tz * rhs.w, this.m30 * rhs.x + this.m31 * rhs.y + this.m32 * rhs.z + this.m33 * rhs.w);
        };
        Mat4.prototype.invert = function () {
            var d = this.determinant;
            var tr = this.trace;
            var m2 = this.multiply(this);
            var m3 = this.multiply(m2);
            var tr2 = m2.trace;
            var tr3 = m3.trace;
            var a = (1 / 6) * ((tr * tr * tr) - (3 * tr * tr2) + (2 * tr3));
            var b = (1 / 2) * (tr * tr - tr2);
            var c = m2.scalarmul(tr).subtract(m3);
            return Mat4.identity().scalarmul(a).subtract(this.scalarmul(b)).add(c).scalarmul(1 / d);
        };
        Mat4.prototype.transpose = function () {
            return new Mat4(_super.prototype.transpose.call(this).v);
        };
        Object.defineProperty(Mat4.prototype, "mat3", {
            get: function () {
                return new gml.Mat3(this.r00, this.r01, this.r02, this.r10, this.r11, this.r12, this.r20, this.r21, this.r22);
            },
            enumerable: true,
            configurable: true
        });
        Mat4.identity = function () {
            return new Mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        };
        Mat4.rotateY = function (angle) {
            var s = Math.sin(angle.toRadians());
            var c = Math.cos(angle.toRadians());
            return new Mat4(c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1);
        };
        Mat4.rotateX = function (angle) {
            var s = Math.sin(angle.toRadians());
            var c = Math.cos(angle.toRadians());
            return new Mat4(1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1);
        };
        Mat4.rotateZ = function (angle) {
            var s = Math.sin(angle.toRadians());
            var c = Math.cos(angle.toRadians());
            return new Mat4(c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        };
        Mat4.rotate = function (axis, angle) {
            var k = new Mat4(0, -axis.z, axis.y, 0, axis.z, 0, -axis.x, 0, -axis.y, axis.x, 0, 0, 0, 0, 0, 0);
            var k2 = k.multiply(k);
            var r = angle.toRadians();
            return Mat4.identity()
                .add(k.multiply(Math.sin(r)))
                .add(k2.multiply(1 - Math.cos(r)));
        };
        return Mat4;
    })(gml.Matrix);
    gml.Mat4 = Mat4;
    function makeMat4FromRows(r1, r2, r3, r4) {
        return new Mat4(r1.x, r1.y, r1.z, r1.w, r2.x, r2.y, r2.z, r2.w, r3.x, r3.y, r3.z, r3.w, r4.x, r4.y, r4.z, r4.w);
    }
    gml.makeMat4FromRows = makeMat4FromRows;
    function makeMat4FromCols(c1, c2, c3, c4) {
        return new Mat4(c1.x, c2.x, c3.x, c4.x, c1.y, c2.y, c3.y, c4.y, c1.z, c2.z, c3.z, c4.z, c1.w, c2.w, c3.w, c4.w);
    }
    gml.makeMat4FromCols = makeMat4FromCols;
    function makePerspective(fov, aspectRatio, near, far) {
        var t = near * Math.tan(fov.toRadians() / 2);
        var r = t * aspectRatio;
        var l = -r;
        var b = -t;
        var n = near;
        var f = far;
        return new Mat4((n * 2) / (r - l), 0, (r + l) / (r - l), 0, 0, (n * 2) / (t - b), (t + b) / (t - b), 0, 0, 0, -(f + n) / (f - n), -(f * n * 2) / (f - n), 0, 0, -1, 0);
    }
    gml.makePerspective = makePerspective;
    function makeLookAt(pos, aim, up, right) {
        var x = right.normalized;
        var y = up.normalized;
        var z = aim.negate().normalized;
        var lookAt = makeMat4FromRows(x, y, z, new gml.Vec4(0, 0, 0, 1));
        var npos = pos.negate();
        lookAt.tx = npos.dot(x);
        lookAt.ty = npos.dot(y);
        lookAt.tz = npos.dot(z);
        return lookAt;
    }
    gml.makeLookAt = makeLookAt;
})(gml || (gml = {}));
///<reference path = "angle.ts" />
///<reference path = "easing.ts" />
///<reference path = "vec.ts" />
///<reference path = "3d/vec2.ts" />
///<reference path = "3d/vec3.ts" />
///<reference path = "3d/vec4.ts" />
///<reference path = "mat.ts" />
///<reference path = "3d/mat3.ts" />
///<reference path = "3d/mat4.ts" />
if (typeof module !== 'undefined') {
    module.exports = gml;
}
//# sourceMappingURL=gml.js.map