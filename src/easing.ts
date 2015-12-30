module gml {
  /**
   * Implements common easing methods (generally used) for animation.
   * All methods assume a normalized input t (time) between 0 and 1
   * and returns an output t' between 0 and 1.
   */
  export class Easing {
    public static QuadIn( t: number ) {
			return t*t;
    }

    public static QuadOut( t: number ) {
			return -t * ( t - 2 );
    }

    public static QuadInOut( t: number ) {
			if ( t < 0.5 ) {
        /* we want verbatim behavior as QuadIn, except we're passing in t
         * with a range of 0 to 0.5, and we want the output to also range from
         * 0 to 0.5.
         *
         * we double the input parameter s.t. it is 0 to 1, then pass it into
         * the QuadIn function (t*t), then half the result to get an output
         * from 0 to 0.5. Constant terms cancel to resolve to 2*t*t
         */
				return 2*t*t;
      } else {
        /* we want verbatim behavior as QuadOut, except we're passing in t
         * with a range of 0.5 to 1, and we want the output to also range from
         * 0.5 to 1.
         *
         * we transform the input parameter s.t. it is 0 to 1, then pass it into
         * the QuadOut function -t(t-2), then transform the result s.t. it is
         * from 0.5 to 1.
         */
        let _t = ( t - 0.5 ) * 2;
        return ( -_t * ( _t - 2 ) ) / 2 + 0.5;
      }
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
        /* we want verbatim behavior as CubicIn, except we're passing in t
         * with a range of 0 to 0.5, and we want the output to also range from
         * 0 to 0.5.
         *
         * we double the input parameter s.t. it is 0 to 1, then pass it into
         * the CubicIn function (t*t*t), then half the result to get an output
         * from 0 to 0.5. Constant terms cancel to resolve to 4*t*t
         */
        return 4*t*t;
      } else {
        /* we want verbatim behavior as CubicOut, except we're passing in t
         * with a range of 0.5 to 1, and we want the output to also range from
         * 0.5 to 1.
         *
         * we transform the input parameter s.t. it is 0 to 1, then pass it into
         * the CubicOut function (t-1)^3 + 1, then transform the result s.t. it is
         * from 0.5 to 1.
         */
        let _t = ( ( t - 0.5 ) * 2 ) - 1;
        return ( _t*_t*_t + 1 ) / 2 + 0.5;
      }
    }
  }
}
