
export abstract class WatchedList<T> {

  public currentItems: T[];
  private initial: T[];
  private new: T[];
  private removed: T[];

  /**
   * Create a new instance of the constructor.
   *
   * @param {T[]} initialItems - An optional array of initial items.
   */
  constructor (initialItems?: T[]) {
    this.currentItems = initialItems ? initialItems : [];
    this.initial = initialItems ? initialItems : [];
    this.new = [];
    this.removed = [];
  }

  abstract compareItems (a: T, b: T): boolean;

  /**
   * Retrieves the items from the currentItems array.
   *
   * @return {T[]} The items from the currentItems array.
   */
  public getItems (): T[] {
    return this.currentItems;
  }

  /**
   * Returns an array of new items.
   *
   * @return {T[]} An array of new items.
   */
  public getNewItems (): T[] {
    return this.new;
  }

  /**
   * Returns an array of removed items.
   *
   * @return {T[]} An array of removed items.
   */
  public getRemovedItems (): T[] {
    return this.removed;
  }
  
  /**
   * Determines if the provided item is the current item.
   *
   * @param {T} item - The item to check.
   * @return {boolean} Returns true if the item is the current item, otherwise false.
   */
  private isCurrentItem (item: T): boolean {
    return this.currentItems
      .filter((v: T) => this.compareItems(item, v)).length !== 0
  }

  /**
   * Checks if the given item is a new item.
   *
   * @param {T} item - The item to check.
   * @return {boolean} Returns true if the item is new, false otherwise.
   */
  private isNewItem (item: T): boolean {
    return this.new
      .filter((v: T) => this.compareItems(item, v)).length !== 0
  }

  /**
   * Checks if an item has been removed.
   *
   * @param {T} item - The item to check.
   * @return {boolean} True if the item has been removed, false otherwise.
   */
  private isRemovedItem (item: T): boolean {
    return this.removed
      .filter((v: T) => this.compareItems(item, v))
      .length !== 0
  }

  /**
   * Remove the specified item from the "new" array.
   *
   * @param {T} item - The item to be removed.
   * @return {void} This function does not return a value.
   */
  private removeFromNew (item: T): void {
    this.new = this.new
    .filter((v) => !this.compareItems(v, item));
  }

  /**
   * Removes the specified item from the current items.
   *
   * @param {T} item - The item to be removed.
   * @return {void} 
   */
  private removeFromCurrent (item: T): void {
    this.currentItems = this.currentItems
        .filter((v) => !this.compareItems(item, v))
  }

  /**
   * Removes the specified item from the array of removed items.
   *
   * @param {T} item - The item to be removed.
   * @return {void} This function does not return anything.
   */
  private removeFromRemoved (item: T): void {
    this.removed = this.removed
        .filter((v) => !this.compareItems(item, v))
  }

  /**
   * Check if the item was initially added.
   *
   * @param {T} item - The item to check.
   * @return {boolean} Returns true if the item was initially added, false otherwise.
   */
  private wasAddedInitially (item: T): boolean {
    return this.initial
      .filter((v: T) => this.compareItems(item, v))
      .length !== 0
  }

  /**
   * Check if the item exists.
   *
   * @param {T} item - The item to check.
   * @return {boolean} True if the item exists, false otherwise.
   */
  public exists (item: T): boolean {
    return this.isCurrentItem(item);
  }

  /**
   * Adds an item to the collection.
   *
   * @param {T} item - The item to be added.
   * @return {void} This function does not return a value.
   */
  public add (item: T): void {
    if (this.isRemovedItem(item)) {
      this.removeFromRemoved(item);
    }

    if (!this.isNewItem(item) && !this.wasAddedInitially(item)) {
      this.new.push(item);
    }

    if (!this.isCurrentItem(item)) {
      this.currentItems.push(item);
    }
  }

  /**
   * Removes an item from the collection.
   *
   * @param {T} item - The item to be removed.
   * @return {void} This function does not return anything.
   */
  public remove (item: T): void {
    this.removeFromCurrent(item);

    if (this.isNewItem(item)) {
      this.removeFromNew(item);
      return;
    }

    if (!this.isRemovedItem(item)) {
      this.removed.push(item);
    }
  }
}