import { Controller, Get } from "@nestjs/common";
import { ApiResource, ApiScope } from "@synbase/shared";
import { Resource, Scopes } from "nest-keycloak-connect";
import { ImageService } from "./image.service";

const { Image: resource } = ApiResource;

@Controller(resource)
@Resource(resource)
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Get("auth")
    @Scopes(ApiScope.Upload)
    public auth() {
        return this.imageService.getAuthentication();
    }
}
