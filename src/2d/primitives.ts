module gml2d {
  export interface Line {
    point: Vec2;  // a point on the line
    normal: Vec2;
  }

  export interface Polygon {
    points: Vec2[];
  }

  export function sign( n: number ): number {
    return n > 0 ? 1 : n < 0 ? -1 : 0;
  }

  export function convex( p: Polygon ): boolean {
    // implements method described by Peter Schorn in Graphics Gems IV.
    // fails a polygon projected onto a line, but otherwise works for all polygons,
    // including complex, self-intersecting polygons like the pentagram.

    let dx = 0, changex = 0;
    let dy = 0, changey = 0;
    
    for ( let i = 1; i < p.points.length; i++ ) {
      let _dx = sign( p.points[i].x - p.points[i-1].x );
      let _dy = sign( p.points[i].y - p.points[i-1].y );

      if ( _dx != 0 && dx != _dx ) {
        dx = _dx;
        changex++;
      }

      if ( _dy != 0 && dy != _dy ) {
        dy = _dy;
        changey++;
      }
    }

    // check wraparound case for last to first vertex
    {
      let _dx = sign( p.points[0].x - p.points[p.points.length-1].x );
      let _dy = sign( p.points[0].y - p.points[p.points.length-1].y );

      if ( _dx != 0 && dx != _dx ) {
        dx = _dx;
        changex++;
      }

      if ( _dy != 0 && dy != _dy ) {
        dy = _dy;
        changey++;
      }
    }

    return changex <= 2 && changey <= 2;
  }
}
