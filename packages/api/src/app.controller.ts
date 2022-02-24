import { Controller, Get } from "@nestjs/common";
import { ensure, IApp } from "@synbase/shared";
import { Public } from "nest-keycloak-connect";

@Controller("app")
export class AppController {
    @Get()
    @Public()
    public getApp(): IApp {
        return {
            version: ensure(process.env.npm_package_version),
        };
    }
}
