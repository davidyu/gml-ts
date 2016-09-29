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
      Vec3.scale( r.direction, t, out );
      Vec3.add( r.point, out, out );
      return out; 
    }
  }

  export class Polygon {
    points: Vec4[];
  }
}
