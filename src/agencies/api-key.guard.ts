import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // ! http specific
    const httpContext = context.switchToHttp();
    // ! express specific
    const request = httpContext.getRequest<Request>();
    const apiKeyHeader = request.header("X-API-Key");
    const isValid = apiKeyHeader === "my-secret";

    return isValid;
  }
}
