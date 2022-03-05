import { Controller, Get } from "@nestjs/common";
import { ApiResource } from "@synbase/shared";
import { Public } from "nest-keycloak-connect";
import { ImageService } from "./image.service";

@Controller(ApiResource.Image)
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Get("auth")
    @Public()
    public auth() {
        return this.imageService.getAuthentication();
    }
}
