import { Controller, Get } from "@nestjs/common";
import { ApiResource, ensure, IApp } from "@synbase/shared";
import { Public, Resource } from "nest-keycloak-connect";

@Controller(ApiResource.App)
@Resource(ApiResource.App)
export class AppController {
    @Get()
    @Public()
    public read(): IApp {
        return {
            version: ensure(process.env.npm_package_version),
        };
    }
}
