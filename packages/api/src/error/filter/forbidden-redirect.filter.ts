import { ArgumentsHost, Catch, ExceptionFilter, ForbiddenException } from "@nestjs/common";
import { Response } from "express";

@Catch(ForbiddenException)
export class ForbiddenRedirectFilter implements ExceptionFilter<ForbiddenRedirectFilter> {
    constructor(private readonly redirectUrl: string) {}

    public catch(exception: ForbiddenRedirectFilter, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.redirect(this.redirectUrl);
    }
}
