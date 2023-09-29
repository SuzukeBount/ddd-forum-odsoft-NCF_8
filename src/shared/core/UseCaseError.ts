
interface IUseCaseError {
  message: string;
}

export abstract class UseCaseError implements IUseCaseError {
  public readonly message: string;
  
  /**
   * Constructor function.
   *
   * @param {string} message - The message to be stored.
   */
  constructor (message: string) {
    this.message = message;
  }
}
