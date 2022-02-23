import { Controller, Get, Logger } from "@nestjs/common";
import { ensure, IApp, Role } from "@synbase/shared";
import { AuthenticatedUser, Roles } from "nest-keycloak-connect";
import { IAuthenticatedUser } from "./auth/model/authenticated-user.model";

@Controller("app")
export class AppController {
    @Get()
    @Roles({
        roles: [Role.User],
    })
    public getApp(@AuthenticatedUser() user: IAuthenticatedUser): IApp {
        Logger.log(user, "AppController");

        return {
            version: ensure(process.env.npm_package_version),
        };
    }
}
