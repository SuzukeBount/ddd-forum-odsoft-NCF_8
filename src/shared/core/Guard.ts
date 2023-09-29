
export type GuardResponse = string;

import { Result } from "./Result";

export interface IGuardArgument {
  argument: any;
  argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
  
  /**
   * Combines the results of multiple guard functions into a single result.
   *
   * @param {Result<any>[]} guardResults - An array of guard results to be combined.
   * @return {Result<GuardResponse>} - The combined guard result.
   */
  public static combine (guardResults: Result<any>[]): Result<GuardResponse> {
    for (let result of guardResults) {
      if (result.isFailure) return result;
    }

    return Result.ok<GuardResponse>();
  }

  /**
   * Checks if the actual value is greater than the minimum value.
   *
   * @param {number} minValue - The minimum value to compare against.
   * @param {number} actualValue - The actual value to check.
   * @return {Result<GuardResponse>} The result of the comparison.
   */
  public static greaterThan (minValue: number, actualValue: number): Result<GuardResponse> {
    return actualValue > minValue 
      ? Result.ok<GuardResponse>() 
      : Result.fail<GuardResponse>(`Number given {${actualValue}} is not greater than {${minValue}}`);
  }

  /**
   * Checks if the given text has at least a certain number of characters.
   *
   * @param {number} numChars - The minimum number of characters that the text should have.
   * @param {string} text - The text to be checked.
   * @return {Result<GuardResponse>} A result object indicating whether the text has at least the specified number of characters.
   */
  public static againstAtLeast (numChars: number, text: string): Result<GuardResponse> {
    return text.length >= numChars 
      ? Result.ok<GuardResponse>() 
      : Result.fail<GuardResponse>(`Text is not at least ${numChars} chars.`);
  }

  /**
   * Checks if the length of the text is at most the specified number of characters.
   *
   * @param {number} numChars - The maximum number of characters allowed.
   * @param {string} text - The text to be checked.
   * @return {Result<GuardResponse>} - Returns a Result object indicating success or failure.
   */
  public static againstAtMost (numChars: number, text: string): Result<GuardResponse> {
    return text.length <= numChars 
      ? Result.ok<GuardResponse>() 
      : Result.fail<GuardResponse>(`Text is greater than ${numChars} chars.`);
  }

  /**
   * Checks if the given argument is null or undefined.
   *
   * @param {any} argument - The argument to check.
   * @param {string} argumentName - The name of the argument.
   * @return {Result<GuardResponse>} A Result object indicating if the argument is null or undefined.
   */
  public static againstNullOrUndefined (argument: any, argumentName: string): Result<GuardResponse> {
    if (argument === null || argument === undefined) {
      return Result.fail<GuardResponse>(`${argumentName} is null or undefined`)
    } else {
      return Result.ok<GuardResponse>();
    }
  }

  /**
   * Executes a guard check against multiple arguments,
   * ensuring that none of them are null or undefined.
   *
   * @param {GuardArgumentCollection} args - the collection of arguments to check
   * @return {Result<GuardResponse>} - the result of the guard check
   */
  public static againstNullOrUndefinedBulk(args: GuardArgumentCollection): Result<GuardResponse> {
    for (let arg of args) {
      const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
      if (result.isFailure) return result;
    }

    return Result.ok<GuardResponse>();
  }

  /**
   * Checks if a value is one of the valid values.
   *
   * @param {any} value - The value to be checked.
   * @param {any[]} validValues - An array of valid values.
   * @param {string} argumentName - The name of the argument being checked.
   * @return {Result<GuardResponse>} Returns a Result object indicating if the value is valid or not.
   */
  public static isOneOf (value: any, validValues: any[], argumentName: string) : Result<GuardResponse> {
    let isValid = false;
    for (let validValue of validValues) {
      if (value === validValue) {
        isValid = true;
      }
    }

    if (isValid) {
      return Result.ok<GuardResponse>()
    } else {
      return Result.fail<GuardResponse>(`${argumentName} isn't oneOf the correct types in ${JSON.stringify(validValues)}. Got "${value}".`);
    }
  }

  /**
   * Checks if a number is within a specified range.
   *
   * @param {number} num - The number to check.
   * @param {number} min - The minimum value of the range.
   * @param {number} max - The maximum value of the range.
   * @param {string} argumentName - The name of the argument being checked.
   * @return {Result<GuardResponse>} A Result object indicating if the number is within the range or not.
   */
  public static inRange (num: number, min: number, max: number, argumentName: string) : Result<GuardResponse> {
    const isInRange = num >= min && num <= max;
    if (!isInRange) {
      return Result.fail<GuardResponse>(`${argumentName} is not within range ${min} to ${max}.`);
    } else {
      return Result.ok<GuardResponse>()
    }
  }

  /**
   * Checks if all numbers in the array are within the specified range.
   *
   * @param {number[]} numbers - The array of numbers to check.
   * @param {number} min - The minimum range value.
   * @param {number} max - The maximum range value.
   * @param {string} argumentName - The name of the argument being checked.
   * @return {Result<GuardResponse>} A Result object indicating success or failure.
   */
  public static allInRange (numbers: number[], min: number, max: number, argumentName: string) : Result<GuardResponse> {
    let failingResult: Result<GuardResponse> = null;

    for(let num of numbers) {
      const numIsInRangeResult = this.inRange(num, min, max, argumentName);
      if (!numIsInRangeResult.isFailure) failingResult = numIsInRangeResult;
    }

    if (failingResult) {
      return Result.fail<GuardResponse>(`${argumentName} is not within the range.`);
    } else {
      return Result.ok<GuardResponse>()
    }
  }
}