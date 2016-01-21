module gml2d {
  export interface Line {
    point: Vec2;  // a point on the line
    normal: Vec2;
  }

  export interface Polygon {
    points: Vec2[];
  }

  export function sign( n: number ): number {
    return Math.abs( n ) < 0.0001 ? 0 : n > 0 ? 1 :-1;
  }

  export function convex( p: Polygon ): boolean {
    // implements method described by Peter Schorn in Graphics Gems IV.
    // works for all polygons, including complex, self-intersecting polygons like the pentagram.

    let target = new Vec2( 0, 0 );
    let forward = new Vec2( 0, 0 );

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
