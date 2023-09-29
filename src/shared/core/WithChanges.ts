
import { Result } from "./Result";

export interface WithChanges {
  changes: Changes;
}

export class Changes {
  private changes: Result<any>[];

  /**
   * Constructor function.
   *
   * @constructor
   */
  constructor () {
    this.changes = [];
  }

/**
 * Adds a change to the list of changes.
 *
 * @param {Result<any>} result - The result to add.
 * @return {void} 
 */
  public addChange (result: Result<any>) : void {
    this.changes.push(result);
  }

  /**
   * Returns the change result of the function.
   *
   * @return {Result<any>} The combined result of the changes.
   */
  public getChangeResult (): Result<any> {
    return Result.combine(this.changes);
  }
}