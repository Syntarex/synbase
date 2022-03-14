import { Controller, Get, Logger, NotFoundException, Param, Query, StreamableFile } from "@nestjs/common";
import { ApiResource, ApiScope, IImage } from "@synbase/shared";
import _ from "lodash";
import { Public, Resource, Scopes } from "nest-keycloak-connect";
import { ImageService } from "./image.service";
import { GetImage } from "./model/get-image.query";
import { GetImages } from "./model/get-images.query";

const { Image: resource } = ApiResource;

@Controller(resource)
@Resource(resource)
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Get()
    @Scopes(ApiScope.ReadAll)
    public async getAll(@Query() query: GetImages): Promise<IImage[]> {
        return await this.imageService.getAll(query);
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

    @Get(":id/image")
    @Public()
    public async getImage(@Param("id") id: string, @Query() query: GetImage): Promise<StreamableFile> {
        Logger.log("ImageController", query);
        const image = await this.imageService.get(id);

        if (_.isNull(image)) {
            throw new NotFoundException();
        }

        return await this.imageService.download(image, query);
    }
}
