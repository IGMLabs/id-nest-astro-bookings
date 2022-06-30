import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class BussinessErrorFilter<Error> implements ExceptionFilter {
  private readonly logger = new Logger("BussinessErrorFilter");

  catch(exception: Error, host: ArgumentsHost) {
    // ! http specific
    const httpContext = host.switchToHttp();
    // ! express specific
    const response = httpContext.getResponse<Response>();
    const message = (exception as any).message;
    this.logger.debug(message);
    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: message,
    });
  }
}
