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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gml2d;
(function (gml2d) {
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
    gml2d.Vec2 = Vec2;
})(gml2d || (gml2d = {}));
///<reference path="../vec.ts"/>
var gml2d;
(function (gml2d) {
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
            return this.x * rhs.y - this.y * rhs.x;
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
    gml2d.Vec3 = Vec3;
})(gml2d || (gml2d = {}));
///<reference path="../mat.ts"/>
var gml2d;
(function (gml2d) {
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
            return new gml2d.Vec3(row);
        };
        Mat3.prototype.column = function (c) {
            var column = [];
            for (var i = 0; i < 3; i++) {
                column.push(this.get(i, c));
            }
            return new gml2d.Vec3(column);
        };
        Mat3.prototype.multiply = function (arg) {
            var m = _super.prototype.multiply.call(this, arg);
            return new Mat3(m.m);
        };
        Mat3.identity = function () {
            return new Mat3(1, 0, 0, 0, 1, 0, 0, 0, 1);
        };
        return Mat3;
    })(gml.Matrix);
    gml2d.Mat3 = Mat3;
})(gml2d || (gml2d = {}));
//# sourceMappingURL=gml2d.js.map