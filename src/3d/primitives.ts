module gml {
  export class Ray {
    point: Vec3;      // initial starting point of ray
    direction: Vec3;  // direction of ray

    constructor( p: Vec3, d: Vec3 ) {
      this.point = p;
      this.direction = d;
    }

    static At( r: Ray, t: number ): Vec3 {
      var out: Vec3;
      Vec3.multiply( r.direction, t, out );
      Vec3.add( r.point, out, out );
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
