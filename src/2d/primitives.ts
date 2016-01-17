module gml2d {
  export interface Line {
    point: Vec2;  // a point on the line
    normal: Vec2;
  }

  export interface Polygon {
    points: Vec2[];
  }

  export function convex( p: Polygon ): boolean {
    return false;
  }
}
