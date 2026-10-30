class IdException extends Error {

    public constructor(mensagem: string, causa?: Error) {
        super(mensagem, { cause: causa });

        this.name = "IdException";
    }
}

abstract class IdBase<T> {

    private readonly _valor: T;

    public constructor(valor: T) {
        this._valor = valor;
    }

    public get valor(): T {
        return this._valor;
    }

    public toString(): string {
        return `${this.constructor.name}(valor=${this._valor})`;
    }
}

interface IdFactory<T> {

    gerar(): Promise<T>;

}

export { IdBase, IdException, IdFactory };
