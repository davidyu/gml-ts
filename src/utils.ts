module gml {
  /**
   * @returns 0 if the number is sufficiently close to 0; -1 if the number is less than 0;
   *          1 if the number is greater than 0.
   */
  export function sign( n: number ): number {
    return Math.abs( n ) < 0.0001 ? 0 : n > 0 ? 1 :-1;
  }
}
