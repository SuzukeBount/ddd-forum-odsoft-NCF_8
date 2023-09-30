
import uuid from 'uuid/v4';
import { Identifier } from './Identifier'

export class UniqueEntityID extends Identifier<string | number>{
  /**
   * A constructor for the class.
   *
   * @param {string | number} id - An optional parameter representing the id of the instance.
   * @return {void} This constructor does not return anything.
   */
  constructor (id?: string | number) {
    super(id ? id : uuid())
  }
}