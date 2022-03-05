import { Controller, Get } from "@nestjs/common";
import { Public } from "nest-keycloak-connect";
import { ImageService } from "./image.service";

@Controller()
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Get("auth")
    @Public()
    public auth() {
        return this.imageService.getAuthentication();
    }
}
