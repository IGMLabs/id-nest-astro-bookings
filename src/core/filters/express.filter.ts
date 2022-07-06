import { ArgumentsHost, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response, Request } from "express";

export class ExpressFilter<EntityNotFoundError> implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    console.log("asdf");
    const { request, response } = this.getExpressData(host);
    const responseError = this.getResponseError(exception, request);
    response.status(responseError.statusCode).json(responseError);
  }
  getExpressData(host: ArgumentsHost) {
    // ! http specific
    const httpContext = host.switchToHttp();
    // ! express specific
    const response = httpContext.getResponse<Response>();
    const request = httpContext.getRequest<Request>();
    return { request, response };
  }

  private getResponseError(exception: EntityNotFoundError, request: Request): ResponseError {
    console.log("asdf");
    let status = HttpStatus.NOT_FOUND;
    const ENTITYNOTFOUND = 404;

    const entityNotFound: any = exception as any;
    if (entityNotFound.code === ENTITYNOTFOUND) status = HttpStatus.NOT_FOUND;

    const responseError = {
      statusCode: status,
      message: entityNotFound.message,
      path: request.url,
    };
    return responseError;
  }
}
export interface ResponseError {
  statusCode: number;
  message: string;
  path?: string;
}
