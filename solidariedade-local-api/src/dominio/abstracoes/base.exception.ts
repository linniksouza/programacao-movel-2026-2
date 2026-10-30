abstract class BaseException extends Error {

    public constructor(mensagem: string, causa?: Error) {
        super(mensagem, { cause: causa });
    }
}

export { BaseException };
