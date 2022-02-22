import { Controller, Get, Logger } from "@nestjs/common";
import { ensure, IApp } from "@synbase/shared";
import { AuthenticatedUser, Public } from "nest-keycloak-connect";
import { IAuthenticatedUser } from "./auth/model/authenticated-user.model";

@Controller("app")
export class AppController {
    @Get()
    @Public()
    public getApp(@AuthenticatedUser() user: IAuthenticatedUser): IApp {
        Logger.log(user, "AppController");

        return {
            version: ensure(process.env.npm_package_version),
        };
    }
}
