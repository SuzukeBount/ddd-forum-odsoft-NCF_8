
import { Result } from "./Result";
import { UseCaseError } from "./UseCaseError";

export namespace AppError {
  export class UnexpectedError extends Result<UseCaseError> {
    /**
     * Constructor for the AppError class.
     *
     * @param {any} err - The error that occurred.
     */
    public constructor (err: any) {
      super(false, {
        message: `An unexpected error occurred.`,
        error: err
      } as UseCaseError)
      console.log(`[AppError]: An unexpected error occurred`);
      console.error(err);
    }

    /**
     * Creates an instance of UnexpectedError.
     *
     * @param {any} err - The error object.
     * @return {UnexpectedError} An instance of UnexpectedError.
     */
    public static create (err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }
}