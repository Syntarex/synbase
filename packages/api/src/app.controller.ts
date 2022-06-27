import { Controller, Get } from "@nestjs/common";
import { ensure, IApp, Permission } from "@synbase/shared";
import { Auth } from "./auth/decorator/auth.decorator";

@Controller("app")
export class AppController {
    @Get()
    @Auth(Permission.ReadApp)
    public read(): IApp {
        return {
            version: ensure(process.env.npm_package_version),
        };
    }
}
