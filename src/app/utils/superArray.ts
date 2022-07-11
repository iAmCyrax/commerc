type ArrayPosition = "start" | "end";
export class SuperArray<T = any> {
    private items: T[];
    /**
     * An array instance that has developed methods.
     * @param items All your array items
     */
    constructor(...items: T[]) {
        this.items = items;
    }

    /**
     * Adds a new item to super array.
     * 
     * @param item Item to add
     * @param position Position of the new item. May be "start" or "end" (defaults to "end")
     */
    add(item: T, position: ArrayPosition = "end"): this {
        switch (position) {
            case "start":
                this.items.unshift(item);
                break;

            case "end":
                this.items.push(item);
                break;
        }
        return this;
    }

    /**
     * Adds e new item to super array at a specific index.
     * 
     * @param item Item to add
     * @param index Index of the array that item added
     */
    addTo(item: T, index: number): this {
        this.items.splice(index, 0, item);
        return this;
    }

    /**
     * Removes a specific item of the super array.
     * 
     * @param item Item to remove
     */
    remove(item: T): this {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
            return this;
        } else {
            throw `Cannot find item named ${item}`;
        }
    }

    /**
     * Clears the array
     */
    clear(): void {
        this.items.splice(0, this.items.length - 1);
    }

    /**
     * Controls the array that item is in it.
     * 
     * @param item Item to control
     */
    has(item: T): boolean {
        const index = this.items.indexOf(item);

        return index > -1;
    }

    each(callback: (item: T, index: number, array: T[]) => void): void {
        this.items.forEach(callback);
    }

    map(callback: (item: T, index: number, array: T[]) => T): T[] {
        return this.items.map(callback);
    }

    changeOne(item: T, newValue: T): T[] {
        const index = this.items.indexOf(item);
        this.items[index] = newValue;
        return this.items;
    }

    getIndex(item: T): number {
        return this.items.indexOf(item);
    }
}

const array = new SuperArray<string>("foo", "bar", "baz", "qux");
