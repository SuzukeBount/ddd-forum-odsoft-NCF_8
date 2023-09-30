
interface ValueObjectProps {
  [index: string]: any;
}

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */

export abstract class ValueObject<T extends ValueObjectProps> {
  public props: T;

  /**
   * Constructor function for the class.
   *
   * @param {T} props - The props object for the class.
   */
  constructor (props: T) {
    let baseProps: any = {
      ...props, 
    }

    this.props = baseProps;
  }

  /**
   * Compares this ValueObject instance with another ValueObject instance for equality.
   *
   * @param {ValueObject<T>} vo - The ValueObject instance to compare with.
   * @return {boolean} Returns true if the two ValueObject instances are equal, false otherwise.
   */
  public equals (vo?: ValueObject<T>) : boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.props === undefined) {
      return false;
    }
    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }
}