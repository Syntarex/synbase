import { Controller, Get } from "@nestjs/common";
import { ensure, IApp } from "@synbase/shared";

@Controller("app")
export class AppController {
    @Get()
    public read(): IApp {
        return {
            version: ensure(process.env.npm_package_version),
        };
    }
}
