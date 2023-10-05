
export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean
  private error: T | string;
  private _value: T;

  /**
   * Constructor for the class.
   *
   * @param {boolean} isSuccess - Whether the operation is successful.
   * @param {T | string} error - The error message or object.
   * @param {T} value - The value of the result.
   */
  public constructor (isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error("InvalidOperation: A result cannot be successful and contain an error");
    }
    if (!isSuccess && !error) {
      throw new Error("InvalidOperation: A failing result needs to contain an error message");
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;
    
    Object.freeze(this);
  }

  /**
   * Retrieves the value of the successful result.
   *
   * @return {T} The value of the successful result.
   */
  public getValue () : T {
    if (!this.isSuccess) {
      console.log(this.error,);
      throw new Error("Can't get the value of an error result. Use 'errorValue' instead.")
    } 

    return this._value;
  }

  /**
   * Retrieves the error value.
   *
   * @return {T} The error value.
   */
  public getErrorValue (): T {
    return this.error as T;
  }

  /**
   * Create a new Result object with a successful value.
   *
   * @param {U} value - The value to be wrapped in the Result object.
   * @return {Result<U>} The newly created Result object.
   */
  public static ok<U> (value?: U) : Result<U> {
    return new Result<U>(true, null, value);
  }

  /**
   * A function that creates a new Result object with a failure status and an error message.
   *
   * @param {string} error - The error message for the failure.
   * @return {Result<U>} - The new Result object with a failure status and the given error message.
   */
  public static fail<U> (error: string): Result<U> {
    return new Result<U>(false, error);
  }

  /**
   * Combines an array of Result objects into a single Result object.
   *
   * @param {Result<any>[]} results - The array of Result objects to combine.
   * @return {Result<any>} - The combined Result object.
   */
  public static combine (results: Result<any>[]) : Result<any> {
    for (let result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok();
  }
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
  readonly value: L;

  /**
   * Create a new instance of the constructor.
   *
   * @param {L} value - The value to assign to the instance.
   */
  constructor(value: L) {
    this.value = value;
  }

  /**
   * Determines if the instance is of the `Left` type.
   *
   * @return {boolean} Returns `true` if the instance is of the `Left` type, `false` otherwise.
   */
  isLeft(): this is Left<L, A> {
    return true;
  }

  /**
   * Checks if this instance is of type Right.
   *
   * @return {boolean} Returns true if this instance is of type Right, otherwise false.
   */
  isRight(): this is Right<L, A> {
    return false;
  }
}

export class Right<L, A> {
  readonly value: A;

  /**
   * Constructs a new instance of the class.
   *
   * @param {A} value - The initial value to set.
   */
  constructor(value: A) {
    this.value = value;
  }

  /**
   * Checks if the object is an instance of the Left class.
   *
   * @return {boolean} Returns true if the object is an instance of the Left class, otherwise returns false.
   */
  isLeft(): this is Left<L, A> {
    return false;
  }

  /**
   * Checks if the instance is of type Right<L, A>.
   *
   * @return {boolean} Returns true if the instance is of type Right<L, A>.
   */
  isRight(): this is Right<L, A> {
    return true;
  }
}

/**
 * Creates an Either object with the provided value as the left value.
 *
 * @param {L} l - The value to be wrapped as the left value.
 * @returns {Either<L, A>} - An Either object with the provided value as the left value.
 */
export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l);
};

/**
 * Creates a new instance of the `Right` class with the specified value.
 *
 * @param {A} a - The value to be wrapped in a `Right` instance.
 * @returns {Either<L, A>} A new `Right` instance containing the specified value.
 */
export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a);
};