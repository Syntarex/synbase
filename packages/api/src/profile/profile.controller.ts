import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { ApiResource, ApiScope, IProfile } from "@synbase/shared";
import _ from "lodash";
import { AuthenticatedUser, Resource, Scopes } from "nest-keycloak-connect";
import { IAuthenticatedUser } from "../auth/model/authenticated-user.model";
import { CreateProfile } from "./model/create-profile.body";
import { GetProfiles } from "./model/get-profiles.query";
import { UpdateProfile } from "./model/update-profile.body";
import { ProfileService } from "./profile.service";

const { Profile: resource } = ApiResource;

@Controller(resource)
@Resource(resource)
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get()
    @Scopes(ApiScope.ReadAll)
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
    @Scopes(ApiScope.ReadAll)
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
        return await this.profileService.create({ ...body, id: user.sub });
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
}
