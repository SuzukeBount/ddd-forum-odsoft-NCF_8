
export class Identifier<T> {
  constructor(private value: T) {
    this.value = value;
  }

  /**
   * Determines whether this object is equal to the specified identifier.
   *
   * @param {Identifier<T>} id - The identifier to compare.
   * @return {boolean} Returns true if this object is equal to the specified identifier, false otherwise.
   */
  equals (id?: Identifier<T>): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    return id.toValue() === this.value;
  }

/**
 *  ToString function.
 *
 * @return {string} The string representation of the value.
 */
  toString () {
    return String(this.value);
  }

  /**
   * Return raw value of identifier
   */

  toValue (): T {
    return this.value;
  }
}
