
import { Entity } from "./Entity";
import { IDomainEvent } from "./events/IDomainEvent";
import { DomainEvents } from "./events/DomainEvents";
import { UniqueEntityID } from "./UniqueEntityID";

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: IDomainEvent[] = [];

  /**
   * Gets the ID of the entity.
   *
   * @return {UniqueEntityID} The ID of the entity.
   */
  get id (): UniqueEntityID {
    return this._id;
  }

/**
 * Retrieves the domain events.
 *
 * @return {IDomainEvent[]} The array of domain events.
 */
  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  /**
   * Adds a domain event to the aggregate's list of domain events.
   *
   * @param {IDomainEvent} domainEvent - The domain event to be added.
   * @return {void} This function does not return anything.
   */
  protected addDomainEvent (domainEvent: IDomainEvent): void {
    // Add the domain event to this aggregate's list of domain events
    this._domainEvents.push(domainEvent);
    // Add this aggregate instance to the domain event's list of aggregates who's
    // events it eventually needs to dispatch.
    DomainEvents.markAggregateForDispatch(this);
    // Log the domain event
    this.logDomainEventAdded(domainEvent);
  }

  /**
   * Clears all the events in the domainEvents array.
   *
   * @return {void} No return value.
   */
  public clearEvents (): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  /**
   * Logs when a domain event is added.
   *
   * @param {IDomainEvent} domainEvent - the domain event to log
   * @return {void} 
   */
  private logDomainEventAdded (domainEvent: IDomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    console.info(`[Domain Event Created]:`, thisClass.constructor.name, '==>', domainEventClass.constructor.name)
  }
}