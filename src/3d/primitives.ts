module gml {
  export class Ray {
    point: Vec4;      // initial starting point of ray
    direction: Vec4;  // direction of ray

    constructor( p: Vec4, d: Vec4 ) {
      this.point = p;
      this.direction = d;
    }

    static At( r: Ray, t: number ): Vec4 {
      var out: Vec4;
      Vec4.multiply( r.direction, t, out );
      Vec4.add( r.point, out, out );
      return out; 
    }
  }

  export class Polygon {
    points: Vec4[];

    constructor( points: Vec4[] ) {
      this.points = points;
    }
  }

  export class Plane {
    // normal dot (point on plane) + d = 0
    normal: Vec4;
    d: number;

    constructor( normal: Vec4, d: number ) {
      this.normal = normal;
      this.d = d;
    }

    static fromCoefficients( coeffs: Vec4 ): Plane {
      return new Plane( new Vec4( coeffs.x, coeffs.y, coeffs.z, 1 ), coeffs.w );
    }
  }
}
