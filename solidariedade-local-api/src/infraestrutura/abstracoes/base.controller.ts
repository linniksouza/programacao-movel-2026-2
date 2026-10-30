interface BaseControllerRequest<TBody = any, TParams = any, TQuery = any> {
    body?: TBody;
    params?: TParams;
    queryString?: TQuery;
};

interface BaseControllerResponse<TBody = any> {
    statusCode: number;
    body?: TBody;
    headers?: Record<string, string>;
}

interface BaseController<Input = any, Output = any> {

    handle(request: BaseControllerRequest<Input>): Promise<BaseControllerResponse<Output>>;

}

class HttpResponseHelper {

    public static ok<T>(body: T, headers?: Record<string, string>): BaseControllerResponse<T> {
        return {
            statusCode: 200,
            body: body,
            ...(headers ? { headers } : {})
        };
    }

    public static created<T>(body: T, headers?: Record<string, string>): BaseControllerResponse<T> {
        return {
            statusCode: 201,
            body: body,
            ...(headers ? { headers } : {})
        };
    }

    public static badRequest<T>(body: T, headers?: Record<string, string>): BaseControllerResponse<T> {
        return {
            statusCode: 400,
            body: body,
            ...(headers ? { headers } : {})
        };
    }

    public static internalServerError<T>(body: T): BaseControllerResponse<T> {
        return {
            statusCode: 500,
            body: body
        };
    }
}

export {
    BaseController,
    BaseControllerRequest,
    BaseControllerResponse,
    HttpResponseHelper
};
