enum Halfspace {
  POSITIVE,
  NEGATIVE,
  COINCIDENT, // point is coincident with line, and does not line on either halfspaces
}

module gml2d {
  let EPSILON = 1e-6;

  // optimization: assume we will call methods in the collision module very often.
  // instead of allocating new vectors in each function call, preallocate some temporary
  // vectors.

  let _tmp_v2_a = new Vec2( 0, 0 );
  let _tmp_v2_b = new Vec2( 0, 0 );

  export function CategorizeHalfspace( point: Vec2, line: Line ): Halfspace {
    let l_to_p = _tmp_v2_a;

    Vec2.subtract( point, line.point, l_to_p );
    let dp = l_to_p.dot( line.normal );
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

    let e = _tmp_v2_a;
    let last_edge = _tmp_v2_b;

    points.sort( ( a: Vec2, b: Vec2 ) => {
      return a.x - b.x;
    } );

    // create upper chain
    let upper = [ points[0], points[1] ];

    for ( let i = 2; i < points.length; i++ ) {
      let p = points[i];

      Vec2.subtract( p, upper[ upper.length - 1 ], e );
      Vec2.subtract( upper[ upper.length - 1 ],  upper[ upper.length - 2 ], last_edge );

      while ( last_edge.cross( e ) > 0 ) {
        // e is to the left of last_edge; error
        upper.pop();
        if ( upper.length < 2 ) break;
        Vec2.subtract( p, upper[ upper.length - 1 ], e );
        Vec2.subtract( upper[ upper.length - 1 ],  upper[ upper.length - 2 ], last_edge );
      }
      upper.push( p );
    }

    // create lower chain
    let lower = [ points[points.length - 1], points[points.length - 2] ];

    for ( let i = points.length - 3; i >= 0; i-- ) {
      let p = points[i];
      Vec2.subtract( p, lower[ lower.length - 1 ], e );
      Vec2.subtract( lower[ lower.length - 1 ],  lower[ lower.length - 2 ], last_edge );
      while ( last_edge.cross( e ) > 0 ) {
        // e is to the left of last_edge; error
        lower.pop();
        if ( lower.length < 2 ) break;
        Vec2.subtract( p, lower[ lower.length - 1 ], e );
        Vec2.subtract( lower[ lower.length - 1 ],  lower[ lower.length - 2 ], last_edge );
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
