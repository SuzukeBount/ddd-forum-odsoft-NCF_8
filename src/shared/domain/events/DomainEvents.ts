
import { IDomainEvent } from "./IDomainEvent";
import { AggregateRoot } from "../AggregateRoot";
import { UniqueEntityID } from "../UniqueEntityID";

export class DomainEvents {
  private static handlersMap = {};
  private static markedAggregates: AggregateRoot<any>[] = [];

  /**
   * @method markAggregateForDispatch
   * @static
   * @desc Called by aggregate root objects that have created domain
   * events to eventually be dispatched when the infrastructure commits
   * the unit of work. 
   */

  public static markAggregateForDispatch (aggregate: AggregateRoot<any>): void {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate);
    }
  }

  /**
   * Dispatches aggregate events.
   *
   * @param {AggregateRoot<any>} aggregate - The aggregate to dispatch events for.
   * @returns {void} This function does not return anything.
   */
  private static dispatchAggregateEvents (aggregate: AggregateRoot<any>): void {
    aggregate.domainEvents.forEach((event: IDomainEvent) => this.dispatch(event));
  }

  /**
   * Removes the specified aggregate from the marked dispatch list.
   *
   * @param {AggregateRoot<any>} aggregate - The aggregate to remove.
   * @return {void} - This function does not return anything.
   */
  private static removeAggregateFromMarkedDispatchList (aggregate: AggregateRoot<any>): void {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate));
    this.markedAggregates.splice(index, 1);
  }

  /**
   * Finds the marked aggregate by ID.
   *
   * @param {UniqueEntityID} id - The ID of the aggregate.
   * @return {AggregateRoot<any>} The found aggregate, or null if not found.
   */
  private static findMarkedAggregateByID (id: UniqueEntityID): AggregateRoot<any> {
    let found: AggregateRoot<any> = null;
    for (let aggregate of this.markedAggregates) {
      if (aggregate.id.equals(id)) {
        found = aggregate;
      }
    }

    return found;
  }

  /**
   * Dispatches events for the specified aggregate.
   *
   * @param {UniqueEntityID} id - The ID of the aggregate.
   * @return {void} This function does not return anything.
   */
  public static dispatchEventsForAggregate (id: UniqueEntityID): void {
    const aggregate = this.findMarkedAggregateByID(id);

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  /**
   * Registers a callback function to handle a specific domain event.
   *
   * @param {function} callback - The callback function that will handle the event.
   * @param {string} eventClassName - The name of the domain event.
   * @return {void} This function does not return a value.
   */
  public static register(callback: (event: IDomainEvent) => void, eventClassName: string): void {
    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(callback);
  }

  /**
   * Clears all the handlers in the handlersMap.
   *
   * @return {void} No return value.
   */
  public static clearHandlers(): void {
    this.handlersMap = {};
  }

  /**
   * Clears the array of marked aggregates.
   *
   * This function sets the `markedAggregates` array to an empty array.
   */
  public static clearMarkedAggregates(): void {
    this.markedAggregates = [];
  }

  /**
   * Dispatches the given event to all registered handlers.
   *
   * @param {IDomainEvent} event - The event to be dispatched.
   * @return {void} This function does not return anything.
   */
  private static dispatch (event: IDomainEvent): void {
    const eventClassName: string = event.constructor.name;

    if (this.handlersMap.hasOwnProperty(eventClassName)) {
      const handlers: any[] = this.handlersMap[eventClassName];
      for (let handler of handlers) {
        handler(event);
      }
    }
  }
}//Fim da classe