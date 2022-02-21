import { Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ensure } from "@synbase/shared";
import { NextFunction } from "express";
import { IRequest } from "../model/request.model";

/** Injects environment variables into the Request object */
@Injectable()
export class EnvMiddleware implements NestMiddleware {
    constructor(private readonly configService: ConfigService) {}

    async use(req: IRequest, res: Response, next: NextFunction) {
        const keycloakClientId = ensure(this.configService.get<string>("API_KEYCLOAK_CLIENT_ID"));

        req.env = {
            keycloakClientId,
        };

        next();
    }
}
