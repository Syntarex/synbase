import { ApiRole } from "@synbase/shared";

export interface IAuthenticatedUser {
    sub: string;
    scope: string;
    name: string;
    email: string;
    resource_access: {
        [clientId: string]: {
            roles: ApiRole[];
        };
    };
}
