abstract class BaseCollection<T> implements Iterable<T> {

    private readonly _itens: T[];

    public constructor() {
        this._itens = [];
    }

    public adicionar(item: T): BaseCollection<T> {
        this._itens.push(item);

        return this;
    }

    *[Symbol.iterator](): Iterator<T> {
        for(const item of this._itens){
            yield item;
        }
    }

    public toString(): string {
        return `${this.constructor.name}(${this._itens.join(", ")})`;
    }
}

export { BaseCollection };
