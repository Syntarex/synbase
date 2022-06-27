import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { QueryFailedError } from "typeorm";

/* TODO: Funktioniert das noch mit TypeORM 0.3.x? */
@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter<QueryFailedError> {
    public catch(exception: QueryFailedError, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        if (exception.message.startsWith("ER_DUP_ENTRY")) {
            response.status(HttpStatus.CONFLICT).json({
                statusCode: HttpStatus.CONFLICT,
                message: "Diese Entität existiert bereits.",
            });

            return;
        }

        if (exception.message.startsWith("ER_NO_REFERENCED_ROW")) {
            response.status(HttpStatus.NOT_FOUND).json({
                statusCode: HttpStatus.NOT_FOUND,
                message: "Referenzierte Entität konnte nicht gefunden werden.",
            });

            return;
        }

        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: exception.message,
        });
    }
}
