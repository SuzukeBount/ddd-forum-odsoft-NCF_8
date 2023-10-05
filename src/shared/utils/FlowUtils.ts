
export class FlowUtils {
  /**
   * Description
   * @param {any} ms:number
   * @returns {any}
   */
  
  public static delay (ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}