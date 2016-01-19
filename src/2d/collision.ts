enum Halfspace {
  POSITIVE,
  NEGATIVE,
  COINCIDENT, // point is coincident with line, and does not line on either halfspaces
}

module gml2d {
  let EPSILON = 1e-6;

  export function CategorizeHalfspace( point: Vec2, line: Line ): Halfspace {
    let p_to_l = point.subtract( line.point );
    let dp = p_to_l.dot( line.normal );
    if ( Math.abs( dp ) < EPSILON ) {
      return Halfspace.COINCIDENT;
    } else if ( dp > 0 ) {
      return Halfspace.POSITIVE;
    } else {
      return Halfspace.NEGATIVE;
    }
  }

  export function ConvexHull( points: Vec2[] ): Polygon {
    if ( points.length <= 2 ) return { points: [] };

    points.sort( ( a: Vec2, b: Vec2 ) => {
      return a.x - b.x;
    } );

    // console.log( points.map( p => { return p.x } ) );

    // create upper chain
    let upper = [ points[0], points[1] ];

    for ( let i = 2; i < points.length; i++ ) {
      let p = points[i];
      let e = p.subtract( upper[ upper.length - 1 ] );
      let last_edge = upper[ upper.length - 1 ].subtract( upper[ upper.length - 2 ] );
      while ( upper.length >= 2 && last_edge.cross( e ) > 0 ) {
        // e is to the left of last_edge; error
        upper.pop();
        e = p.subtract( upper[ upper.length - 1 ] );
        last_edge = upper[ upper.length - 1 ].subtract( upper[ upper.length - 2 ] );
      }
      upper.push( p );
    }

    // create lower chain
    let lower = [ points[0], points[1] ];

    for ( let i = points.length - 3; i >= 0; i-- ) {
      let p = points[i];
      let e = p.subtract( lower[ lower.length - 1 ] );
      let last_edge = lower[ lower.length - 1 ].subtract( lower[ lower.length - 2 ] );
      while ( lower.length >= 2 && last_edge.cross( e ) > 0 ) {
        // e is to the left of last_edge; error
        lower.pop();
        e = p.subtract( lower[ lower.length - 1 ] );
        last_edge = lower[ lower.length - 1 ].subtract( lower[ lower.length - 2 ] );
      }
      lower.push( p );
    }

    // remove duplicate points
    upper.pop();
    lower.pop();
    var pts = upper.concat( lower );

    // console.log( pts );

    return { points: pts };
  }
}
