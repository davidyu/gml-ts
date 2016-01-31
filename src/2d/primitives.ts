module gml2d {
  /***
   * A temporary global static Vec2 that used by methods in this module
   * @hidden
   */
  let _tmp_v2_a = new Vec2( 0, 0 );

  /***
   * A temporary global static Vec2 that used by methods in this module
   * @hidden
   */
  let _tmp_v2_b = new Vec2( 0, 0 );

  export interface Line {
    point: Vec2;  // a point on the line
    normal: Vec2;
  }

  export interface Polygon {
    points: Vec2[];
  }

  /**
   * @returns 0 if the number is sufficiently close to 0; -1 if the number is less than 0;
   *          1 if the number is greater than 0.
   */
  export function sign( n: number ): number {
    return Math.abs( n ) < 0.0001 ? 0 : n > 0 ? 1 :-1;
  }

  /**
   * Implements a robust polygon convexity test described by Peter Schorn in Graphics Gems IV.
   * It correctly assesses the convexity for all polygons, including complex, self-intersecting
   * polygons like the pentagram.
   *
   * @returns whether or not the input polygon is a convex polygon.
   */
  export function convex( p: Polygon ): boolean {
    let target = _tmp_v2_a;
    let forward = _tmp_v2_b;

    Vec2.subtract( p.points[0], p.points[p.points.length - 2], target );
    Vec2.subtract( p.points[0], p.points[p.points.length - 1], forward );

    let dir = sign( forward.cross( target ) );
    let changedir = 0

    // walk the points of the polygon and make sure we are always going in one direction (CW or CCW)
    for ( let i = 1; i < p.points.length; i++ ) {
      Vec2.subtract( p.points[i], p.points[ ( i - 2 + p.points.length ) % p.points.length ], target );
      Vec2.subtract( p.points[i], p.points[i-1], forward );

      let _dir = sign( forward.cross( target ) );
      if ( _dir != dir ) changedir++;

      dir = _dir;
    }

    // early exit for simple case (if we changed directions p must be concave)
    if ( changedir > 0 ) {
      return false;
    } else {
      // check for collinear but overlapping edges by checking for
      // changes in direction in the x- and y- axis.
      let dx = sign( p.points[0].x - p.points[p.points.length - 1].x ),
          dy = sign( p.points[0].y - p.points[p.points.length - 1].y );

      let changex = 0, changey = 0;
      
      for ( let i = 1; i < p.points.length; i++ ) {
        let _dx = sign( p.points[i].x - p.points[i-1].x );
        let _dy = sign( p.points[i].y - p.points[i-1].y );

        if ( _dx != 0 && dx != _dx ) changex++;
        if ( _dy != 0 && dy != _dy ) changey++;

        dx = _dx;
        dy = _dy;
      }

      return changex <= 2 && changey <= 2;
    }
  }
}
