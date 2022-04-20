import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    UploadedFile,
} from "@nestjs/common";
import { ApiResource, ApiScope, IBlogItem } from "@synbase/shared";
import _ from "lodash";
import { AuthenticatedUser, Public, Resource, Scopes } from "nest-keycloak-connect";
import { IAuthenticatedUser } from "../auth/model/authenticated-user.model";
import { FileUpload } from "../image/decorator/file-upload.decorator";
import { ImageService } from "../image/image.service";
import { BlogItemService } from "./blog-item.service";
import { CreateBlogItem } from "./model/create-blog-item.body";
import { GetBlogItems } from "./model/get-blog-items.query";
import { UpdateBlogItem } from "./model/update-blog-item.body";

const { BlogItem: resource } = ApiResource;

@Controller(resource)
@Resource(resource)
export class BlogItemController {
    constructor(private readonly blogItemService: BlogItemService, private readonly imageService: ImageService) {}

    @Get()
    @Public()
    public async getAll(@Query() query: GetBlogItems): Promise<IBlogItem[]> {
        return await this.blogItemService.getAll(query);
    }

    @Get(":id")
    @Public()
    public async get(@Param("id") id: string): Promise<IBlogItem> {
        const blogItem = await this.blogItemService.get(id);

        if (_.isNull(blogItem)) {
            throw new NotFoundException();
        }

        return blogItem;
    }

    @Post()
    @Scopes(ApiScope.CreateAll)
    public async create(
        @Body() body: CreateBlogItem,
        @AuthenticatedUser() user: IAuthenticatedUser,
    ): Promise<IBlogItem> {
        return await this.blogItemService.create({ ...body, authorId: user.sub });
    }

    @Put(":id")
    @Scopes(ApiScope.UpdateAll)
    public async update(@Param("id") id: string, @Body() body: UpdateBlogItem): Promise<IBlogItem> {
        const blogItem = await this.blogItemService.update(id, body);

        if (_.isNull(blogItem)) {
            throw new NotFoundException();
        }

        return blogItem;
    }

    @Delete(":id")
    @Scopes(ApiScope.DeleteAll)
    public async delete(@Param("id") id: string): Promise<void> {
        const result = await this.blogItemService.delete(id);

        if (!result) {
            throw new NotFoundException();
        }
    }

    @Post(":id/image")
    @Scopes(ApiScope.UpdateAll, ApiScope.Upload)
    @FileUpload()
    public async uploadImage(@Param("id") id: string, @UploadedFile() file: Express.Multer.File) {
        const blogItem = await this.blogItemService.get(id);

        if (_.isNull(blogItem)) {
            throw new NotFoundException();
        }

        const image = await this.imageService.upload({
            file,
            fileName: id,
            uploaderId: id,
            folder: resource,
            id: blogItem.imageId,
        });

        if (_.isNull(image)) {
            throw new NotFoundException();
        }

        await this.imageService.purgeCache(image);

        await this.blogItemService.update(id, {
            imageId: image.id,
        });

        return image;
    }

    /* TODO: Delete my Image */
}
