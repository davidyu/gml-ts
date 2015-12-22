module gml {
  export class Easing {
    public static QuadIn( t: number ) {
			return t*t;
    }

    public static QuadOut( t: number ) {
			return -t * ( t - 2 );
    }

    public static QuadInOut( t: number ) {
			if ( t < 0.5 )
				return 2*t*t;
			else
				return -0.5 * ( ( 2*t-1 ) * ( 2 * ( t-1 ) - 2 ) - 1 );
    }

    public static CubicIn( t: number ) {
      return t*t*t;
    }

    public static CubicOut( t: number ) {
      let _t = t - 1;
      return _t*_t*_t + 1;
    }

    public static CubicInOut( t: number ) {
      if ( t < 0.5 ) {
        let _t = 2 * t;
        return _t * _t * _t;
      } else {
        let _t = ( ( t - 0.5 ) * 2 ) - 1;
        return ( _t*_t*_t + 1 ) / 2 + 0.5;
      }
    }
  }
}
