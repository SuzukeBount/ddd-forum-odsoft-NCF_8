
import { UniqueEntityID } from './UniqueEntityID';

/**
 * Checks if a value is an instance of the Entity class.
 *
 * @param {any} v - The value to be checked.
 * @return {boolean} Returns true if the value is an instance of the Entity class, false otherwise.
 */
const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID;
  public readonly props: T;

  /**
   * Constructs a new instance of the class.
   *
   * @param {T} props - The props parameter description.
   * @param {UniqueEntityID} id - The id parameter description (optional).
   */
  constructor (props: T, id?: UniqueEntityID) {
    this._id = id ? id : new UniqueEntityID();
    this.props = props;
  }

  /**
   * Checks if the current entity is equal to the specified object.
   *
   * @param {Entity<T>} object - The object to compare.
   * @return {boolean} Returns true if the current entity is equal to the specified object, otherwise false.
   */
  public equals (object?: Entity<T>) : boolean {

    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}