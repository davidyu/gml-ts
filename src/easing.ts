module gml {
  /**
   * Implements common easing methods (generally used) for tweening.
   * The easing formulas used here are based on the work by
   * <a href="http://robertpenner.com/easing/">Robert Penner</a>.
   *
   * All methods assume a normalized input t (time) between 0 and 1
   * and returns an output t' between 0 and 1.
   */
  export class Easing {
    public static QuadIn( t: number ) {
			return t*t;
    }

    public static QuadOut( t: number ) {
      // note that this works out to be the same as
      // 1-(x-1)(x-1)
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
         * from 0 to 0.5. Constant terms cancel to resolve to 4*t*t*t
         */
        return 4*t*t*t;
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

    public static QuarticIn( t: number ) {
      return t*t*t*t;
    }

    public static QuarticOut( t: number ) {
      let _t = t - 1;
      return 1 - _t*_t*_t*_t;
    }

    public static QuarticInOut( t: number ) {
      if ( t < 0.5 ) {
        /* we want verbatim behavior as QuarticIn, except we're passing in t
         * with a range of 0 to 0.5, and we want the output to also range from
         * 0 to 0.5.
         *
         * we double the input parameter s.t. it is 0 to 1, then pass it into
         * the QuarticIn function (t*t*t*t), then half the result to get an output
         * from 0 to 0.5. IE: 0.5*2t*2t*2t*2t. Resolves to 8*t*t*t*t
         */
        return 8*t*t*t*t;
      } else {
        /* we want verbatim behavior as QuarticOut, except we're passing in t
         * with a range of 0.5 to 1, and we want the output to also range from
         * 0.5 to 1.
         *
         * we transform the input parameter s.t. it is 0 to 1, then pass it into
         * the QuarticOut function (t-1)^3 + 1, then transform the result s.t. it is
         * from 0.5 to 1.
         */
        let _t = ( ( t - 0.5 ) * 2 ) - 1;
        return ( -_t*_t*_t*_t + 1 ) / 2 + 0.5;
      }
    }

    public static QuintIn( t: number ) {
      return t*t*t*t*t;
    }

    public static QuintOut( t: number ) {
      let _t = t - 1;
      return _t*_t*_t*_t*_t + 1;
    }

    public static QuintInOut( t: number ) {
      if ( t < 0.5 ) {
        /* we want verbatim behavior as QuintIn, except we're passing in t
         * with a range of 0 to 0.5, and we want the output to also range from
         * 0 to 0.5.
         *
         * we double the input parameter s.t. it is 0 to 1, then pass it into
         * the QuintIn function (t*t*t*t*t), then half the result to get an output
         * from 0 to 0.5. IE: 0.5*2t*2t*2t*2t*2t. Resolves to 16*t*t*t*t*t
         */
        return 16*t*t*t*t*t;
      } else {
        /* we want verbatim behavior as QuintOut, except we're passing in t
         * with a range of 0.5 to 1, and we want the output to also range from
         * 0.5 to 1.
         *
         * we transform the input parameter s.t. it is 0 to 1, then pass it into
         * the QuarticOut function (t-1)^5 + 1, then transform the result s.t. it is
         * from 0.5 to 1.
         */
        let _t = ( ( t - 0.5 ) * 2 ) - 1;
        return ( _t*_t*_t*_t*_t + 1 ) / 2 + 0.5;
      }
    }

    public static TrigIn( t: number ) {
      return 1 - Math.cos( t * ( Math.PI / 2 ) );
    }

    public static TrigOut( t: number ) {
      return Math.sin( t * ( Math.PI / 2 ) );
    }

    public static TrigInOut( t: number ) {
      if ( t < 0.5 ) {
        return 0.5 * ( Math.sin( Math.PI * t ) );
      } else {
        return -0.5 * ( Math.cos( Math.PI * ( 2 * t - 1 ) / 2 ) - 2 );
      }
    }

    public static ExpIn( t: number, base: number = 10 ) {
      return t == 0 ? 0 : Math.pow( 2, base * ( t - 1 ) );
    }

    public static ExpOut( t: number, base: number = 10 ) {
      return t == 1 ? 1 : 1 - Math.pow( 2, -base * t );
    }

    public static ExpInOut( t: number, base: number = 10 ) {
      if ( t == 0 ) return 0;
      if ( t >= 1 ) return 1;
      if ( t < 0.5 ) {
        let _base = base * ( 2 * t - 1 ) - 1;
        return Math.pow( 2, _base );
      } else {
        let _base = -base * ( 2 * t - 1 ) - 1;
        return 1 - Math.pow( 2, _base );
      }
    }

    public static BackIn( t: number, s: number = 1.70158 ) {
      return t * t * ( ( s + 1 ) * t - s );
    }

    public static BackOut( t: number, s: number = 1.70158 ) {
      let _t = t - 1;
      return _t * _t * ( ( s + 1 ) * _t + s ) + 1;
    }

    public static BackInOut( t: number, s: number = 1.70158 ) {
      if ( t < 0.5 ) {
        let _t = t * 2;
        return 0.5 * _t * _t * ( ( s + 1 ) * _t - s );
      } else {
        let _t = ( ( t - 0.5 ) * 2 ) - 1;
        return ( _t * _t * ( ( s + 1 ) * _t + s ) + 1 ) / 2 + 0.5;
      }
    }

    public static ElasticIn( t: number ) {
      // elastic easing is essentially a transformation of the dampened sine wave
      // the elastic-ease-in curve looks like the reverse of a dampened sine wave
      if ( t == 0 ) return 0;
      if ( t == 1 ) return 1;
      let p = 0.3;
      let s = p / 4;
      let _t = t - 1;
      return -Math.pow( 2, 10 * _t ) * Math.sin( ( _t - s ) * 2 * Math.PI / p ); 
    }

    public static ElasticOut( t: number ) {
      // the elastic-ease-in curve looks like the standard version of a dampened sine wave
      if ( t == 0 ) return 0;
      if ( t == 1 ) return 1;
      let p = 0.3;
      let s = p / 4;
      return Math.pow( 2, -10 * t ) * Math.sin( ( t - s ) * 2 * Math.PI / p ) + 1;
    }

    public static ElasticInOut( t: number ) {
      if ( t == 0 ) return 0;
      if ( t == 1 ) return 1;
      let p = 0.45;
      let s = p / 4;
      if ( t < 0.5 ) {
        let _t = 2 * t;
        return -0.5 * Math.pow( 2, 10 * ( _t - 1 ) ) * Math.sin( ( ( _t - 1 ) - s ) * 2 * Math.PI / p ); 
      } else {
        let _t = 2 * t - 1;
        return 0.5 * Math.pow( 2, -10 * _t ) * Math.sin( ( _t - s ) * 2 * Math.PI / p ) + 1;
      }
    }

    public static BounceIn( t: number ) {
      return 1 - Easing.BounceOut( 1 - t );
    }

    public static BounceOut( t: number ) {
      if ( t < ( 1 / 2.75 ) ) {
        return 7.5625 * t * t;
      } else if (t < ( 2 / 2.75 ) ) {
        let _t = t - 1.5 / 2.75;
        return 7.5625 * _t * _t + 0.75;
      } else if ( t < ( 2.5/2.75 ) ) {
        let _t = t - 2.25 / 2.75;
        return 7.5625 * _t * _t + .9375;
      } else {
        let _t = t - 2.625 / 2.75;
        return 7.5625 * _t * _t + .984375;
      }
    }

    public static BounceInOut( t: number ) {
      if ( t < 0.5 ) return 0.5 * Easing.BounceIn ( 2 * t );
      else           return 0.5 + 0.5 * Easing.BounceOut( 2 * t - 1 );
    }
  }
}

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
