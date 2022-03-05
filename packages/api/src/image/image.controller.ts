import { Controller, Get, NotFoundException, Param, Query } from "@nestjs/common";
import { ApiResource, IImage } from "@synbase/shared";
import _ from "lodash";
import { Public, Resource } from "nest-keycloak-connect";
import { ImageService } from "./image.service";
import { GetImage } from "./model/get-image.query";

const { Image: resource } = ApiResource;

@Controller(resource)
@Resource(resource)
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Get()
    @Public()
    public async getAll(@Query() query: GetImage): Promise<IImage[]> {
        return await this.imageService.getAll(query);
    }

    @Get(":id/media")
    @Public()
    public async getMedia(@Param("id") id: string): Promise<void> {
        const image = await this.imageService.get(id);

        if (_.isNull(image)) {
            throw new NotFoundException();
        }

        /* TODO: Image Stream zurückgeben */
    }

    @Get(":id")
    @Public()
    public async get(@Param("id") id: string): Promise<IImage> {
        const image = await this.imageService.get(id);

        if (_.isNull(image)) {
            throw new NotFoundException();
        }

        return image;
    }
}
