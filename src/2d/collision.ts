enum Halfspace {
  POSITIVE,
  NEGATIVE,
  COINCIDENT, // point is coincident with line, and does not line on either halfspaces
}

module gml2d {
  let EPSILON = 1e-6;

  // optimization: assume we will call CategorizeHalfspace very often; we do not want to construct a new vector every call.
  // instead, use a static temporary vector.
  let _temp_v2 = new Vec2( 0, 0 );

  export function CategorizeHalfspace( point: Vec2, line: Line ): Halfspace {
    Vec2.subtract( point, line.point, _temp_v2 );
    let dp = _temp_v2.dot( line.normal );
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

    // create upper chain
    let upper = [ points[0], points[1] ];

    for ( let i = 2; i < points.length; i++ ) {
      let p = points[i];
      let e = p.subtract( upper[ upper.length - 1 ] );
      let last_edge = upper[ upper.length - 1 ].subtract( upper[ upper.length - 2 ] );
      while ( last_edge.cross( e ) > 0 ) {
        // e is to the left of last_edge; error
        upper.pop();
        if ( upper.length < 2 ) break;
        e = p.subtract( upper[ upper.length - 1 ] );
        last_edge = upper[ upper.length - 1 ].subtract( upper[ upper.length - 2 ] );
      }
      upper.push( p );
    }

    // create lower chain
    let lower = [ points[points.length - 1], points[points.length - 2] ];

    for ( let i = points.length - 3; i >= 0; i-- ) {
      let p = points[i];
      let e = p.subtract( lower[ lower.length - 1 ] );
      let last_edge = lower[ lower.length - 1 ].subtract( lower[ lower.length - 2 ] );
      while ( last_edge.cross( e ) > 0 ) {
        // e is to the left of last_edge; error
        lower.pop();
        if ( lower.length < 2 ) break;
        e = p.subtract( lower[ lower.length - 1 ] );
        last_edge = lower[ lower.length - 1 ].subtract( lower[ lower.length - 2 ] );
      }
      lower.push( p );
    }

    // remove duplicate points
    upper.pop();
    lower.pop();
    var pts = upper.concat( lower );

    return { points: pts };
  }
}
