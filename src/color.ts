module gml {
  export class Color extends Vector {
    constructor( v: number[] );
    constructor( v: Float32Array );
    constructor( r: number, g: number, b: number, a: number );

    constructor( ...args: any[] ) {
      super( 4 );
      if ( args.length == 4 ) {
        this.v[0] = args[0];
        this.v[1] = args[1];
        this.v[2] = args[2];
        this.v[3] = args[3];
      } else if ( args.length == 1 ) {
        let arr = args[0];
        this.v[0] = arr[0];
        this.v[1] = arr[1];
        this.v[2] = arr[2];
        this.v[3] = arr[3];
      }
    }

    public get r(): number {
      return this.v[0];
    }

    public get g(): number {
      return this.v[1];
    }

    public get b(): number {
      return this.v[2];
    }

    public get a(): number {
      return this.v[3];
    }

    public set r( r: number ) {
      this.v[0] = r;
    }

    public set g( g: number ) {
      this.v[1] = g;
    }

    public set b( b: number ) {
      this.v[2] = b;
    }

    public set a( a: number ) {
      this.v[3] = a;
    }

    public static degamma( in_color: Color, out_color: Color ) {
      let to_linear = 1.0 / 2.2;
      out_color.r = Math.pow( in_color.r, to_linear );
      out_color.g = Math.pow( in_color.g, to_linear );
      out_color.b = Math.pow( in_color.b, to_linear );
      out_color.a = in_color.a;
    }

    public static engamma( in_color: Color, out_color: Color ) {
      let to_srgb = 2.2;
      out_color.r = Math.pow( in_color.r, to_srgb );
      out_color.g = Math.pow( in_color.g, to_srgb );
      out_color.b = Math.pow( in_color.b, to_srgb );
      out_color.a = in_color.a;
    }

    public static get white(): Color {
      return new Color( 1, 1, 1, 1 );
    }

    public static get black(): Color {
      return new Color( 0, 0, 0, 1 );
    }

    public static get transparent_black(): Color {
      return new Color( 0, 0, 0, 0 );
    }
  }
}
