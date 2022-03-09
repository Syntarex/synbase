import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    StreamableFile,
    UploadedFile,
} from "@nestjs/common";
import { ApiResource, ApiScope, IImage, IProfile } from "@synbase/shared";
import _ from "lodash";
import { AuthenticatedUser, Public, Resource, Scopes } from "nest-keycloak-connect";
import { IAuthenticatedUser } from "../auth/model/authenticated-user.model";
import { FileUpload } from "../image/decorator/file-upload.decorator";
import { ImageService } from "../image/image.service";
import { CreateProfile } from "./model/create-profile.body";
import { GetProfiles } from "./model/get-profiles.query";
import { UpdateProfile } from "./model/update-profile.body";
import { ProfileService } from "./profile.service";

const { Profile: resource } = ApiResource;

@Controller(resource)
@Resource(resource)
export class ProfileController {
    constructor(private readonly profileService: ProfileService, private readonly imageService: ImageService) {}

    @Get()
    @Public()
    public async getAll(@Query() query: GetProfiles): Promise<IProfile[]> {
        return await this.profileService.getAll(query);
    }

    @Get("my")
    @Scopes(ApiScope.Read)
    public async getMy(@AuthenticatedUser() user: IAuthenticatedUser): Promise<IProfile> {
        const profile = await this.profileService.get(user.sub);

        if (_.isNull(profile)) {
            throw new NotFoundException();
        }

        return profile;
    }

    @Get(":id")
    @Public()
    public async get(@Param("id") id: string): Promise<IProfile> {
        const profile = await this.profileService.get(id);

        if (_.isNull(profile)) {
            throw new NotFoundException();
        }

        return profile;
    }

    @Post("my")
    @Scopes(ApiScope.Create)
    public async createMy(
        @Body() body: CreateProfile,
        @AuthenticatedUser() user: IAuthenticatedUser,
    ): Promise<IProfile> {
        Logger.log(body, "ProfileController");
        Logger.log(user, "ProfileController");
        return await this.profileService.create({ ...body, id: user.sub, imageId: null });
    }

    @Put("my")
    @Scopes(ApiScope.Update)
    public async updateMy(
        @Body() body: UpdateProfile,
        @AuthenticatedUser() user: IAuthenticatedUser,
    ): Promise<IProfile> {
        const profile = await this.profileService.update(user.sub, body);

        if (_.isNull(profile)) {
            throw new NotFoundException();
        }

        return profile;
    }

    @Put(":id")
    @Scopes(ApiScope.UpdateAll)
    public async update(@Param("id") id: string, @Body() body: UpdateProfile): Promise<IProfile> {
        const profile = await this.profileService.update(id, body);

        if (_.isNull(profile)) {
            throw new NotFoundException();
        }

        return profile;
    }

    @Delete("my")
    @Scopes(ApiScope.Delete)
    public async deleteMy(@AuthenticatedUser() user: IAuthenticatedUser): Promise<void> {
        const result = await this.profileService.delete(user.sub);

        if (!result) {
            throw new NotFoundException();
        }
    }

    @Delete(":id")
    @Scopes(ApiScope.DeleteAll)
    public async delete(@Param("id") id: string): Promise<void> {
        const result = await this.profileService.delete(id);

        if (!result) {
            throw new NotFoundException();
        }
    }

    @Get("my/image")
    @Scopes(ApiScope.Read)
    public async getMyImage(@AuthenticatedUser() user: IAuthenticatedUser): Promise<StreamableFile> {
        const profile = await this.profileService.get(user.sub);

        if (_.isNull(profile)) {
            throw new NotFoundException();
        }

        const image = await profile.image;

        if (_.isNull(image)) {
            throw new NotFoundException();
        }

        return await this.imageService.download(image);
    }

    @Get(":id/image")
    @Public()
    public async getImage(@Param("id") id: string): Promise<StreamableFile> {
        const profile = await this.profileService.get(id);

        if (_.isNull(profile)) {
            throw new NotFoundException();
        }

        const image = await profile.image;

        if (_.isNull(image)) {
            throw new NotFoundException();
        }

        return await this.imageService.download(image);
    }

    @Post("my/image")
    @Scopes(ApiScope.Update, ApiScope.Upload)
    @FileUpload()
    public async uploadMyImage(
        @UploadedFile() file: Express.Multer.File,
        @AuthenticatedUser() user: IAuthenticatedUser,
    ): Promise<IImage> {
        const profile = await this.profileService.get(user.sub);

        if (_.isNull(profile)) {
            throw new NotFoundException();
        }

        const image = await this.imageService.upload({
            file,
            fileName: user.sub,
            uploaderId: user.sub,
            folder: resource,
            id: profile.imageId,
        });

        if (_.isNull(image)) {
            throw new NotFoundException();
        }

        await this.profileService.update(user.sub, {
            imageId: image.id,
        });

        return image;
    }

    @Post(":id/image")
    @Scopes(ApiScope.UpdateAll, ApiScope.Upload)
    @FileUpload()
    public async uploadImage(@Param("id") id: string, @UploadedFile() file: Express.Multer.File) {
        const profile = await this.profileService.get(id);

        if (_.isNull(profile)) {
            throw new NotFoundException();
        }

        const image = await this.imageService.upload({
            file,
            fileName: id,
            uploaderId: id,
            folder: resource,
            id: profile.imageId,
        });

        if (_.isNull(image)) {
            throw new NotFoundException();
        }

        await this.profileService.update(id, {
            imageId: image.id,
        });

        return image;
    }
}
