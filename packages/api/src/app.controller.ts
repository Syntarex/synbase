import { Controller, Get } from "@nestjs/common";
import { ApiResource, ApiScope, ensure, IApp } from "@synbase/shared";
import { Resource, Scopes } from "nest-keycloak-connect";

@Controller("app")
@Resource(ApiResource.App)
export class AppController {
    @Get()
    @Scopes(ApiScope.Read)
    public getApp(): IApp {
        return {
            version: ensure(process.env.npm_package_version),
        };
    }
}
