import { Controller, Get } from "@nestjs/common";
import { ApiResource, ApiScope, ensure, IApp } from "@synbase/shared";
import { AuthenticatedUser, Resource, Scopes } from "nest-keycloak-connect";
import { IAuthenticatedUser } from "./auth/model/authenticated-user.model";

@Controller("app")
@Resource(ApiResource.App)
export class AppController {
    @Get()
    @Scopes(ApiScope.Read)
    public getApp(@AuthenticatedUser() user: IAuthenticatedUser): IApp {
        console.log(user);
        return {
            version: ensure(process.env.npm_package_version),
        };
    }
}
