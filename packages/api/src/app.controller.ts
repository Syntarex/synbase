import { Controller, Get } from "@nestjs/common";
import { ApiResource, ensure, IApp } from "@synbase/shared";
import { Public, Resource } from "nest-keycloak-connect";

const { App: resource } = ApiResource;

@Controller(resource)
@Resource(resource)
export class AppController {
    @Get()
    @Public()
    public read(): IApp {
        return {
            version: ensure(process.env.npm_package_version),
        };
    }
}
