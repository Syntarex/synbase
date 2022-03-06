import { Controller, Get } from "@nestjs/common";
import { ApiResource } from "@synbase/shared";
import { Public } from "nest-keycloak-connect";
import { ImageService } from "./image.service";

const { Image: resource } = ApiResource;

/* TODO: Wäre schön wenn man die Schnittstelle per Scope sichern könnte, jedoch erlaubt es imagekit nicht einen Custom Authorization Header mit anzuhängen */
@Controller(resource)
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Get("auth")
    @Public()
    public auth() {
        return this.imageService.getAuthentication();
    }
}
