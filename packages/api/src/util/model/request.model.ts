import { Request } from "express";
import { IAuthenticatedUser } from "../../auth/model/authenticated-user.model";

export interface IRequest extends Request {
    user?: IAuthenticatedUser;
    env: {
        keycloakClientId: string;
    };
}
