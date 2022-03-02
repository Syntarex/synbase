import { Body, Controller, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { ApiResource, ApiScope, IDiscordVerification } from "@synbase/shared";
import _ from "lodash";
import { AuthenticatedUser, Resource, Scopes } from "nest-keycloak-connect";
import { IAuthenticatedUser } from "../auth/model/authenticated-user.model";
import { DiscordVerificationService } from "./discord-verification.service";
import { CreateDiscordVerification } from "./model/create-discord-verification.body";
import { GetDiscordVerification } from "./model/get-discord-verification.query";
import { UpdateDiscordVerification } from "./model/update-discord-verification.body";

const { DiscordVerification: resource } = ApiResource;

@Controller(resource)
@Resource(resource)
export class DiscordVerificationController {
    constructor(private readonly discordVerificationService: DiscordVerificationService) {}

    @Get()
    @Scopes(ApiScope.ReadAll)
    public async getAll(@Query() query: GetDiscordVerification): Promise<IDiscordVerification[]> {
        return await this.discordVerificationService.getAll(query);
    }

    @Get("my")
    @Scopes(ApiScope.Read)
    public async getMy(@AuthenticatedUser() user: IAuthenticatedUser): Promise<IDiscordVerification> {
        const discordVerification = await this.discordVerificationService.get(user.sub);

        if (_.isNull(discordVerification)) {
            throw new NotFoundException();
        }

        return discordVerification;
    }

    @Get(":id")
    @Scopes(ApiScope.ReadAll)
    public async get(@Param("id") id: string): Promise<IDiscordVerification> {
        const discordVerification = await this.discordVerificationService.get(id);

        if (_.isNull(discordVerification)) {
            throw new NotFoundException();
        }

        return discordVerification;
    }

    @Post("my")
    @Scopes(ApiScope.Create)
    public async createMy(
        @Body() body: CreateDiscordVerification,
        @AuthenticatedUser() user: IAuthenticatedUser,
    ): Promise<IDiscordVerification> {
        return await this.discordVerificationService.create({
            id: user.sub,
            ...body,
        });
    }

    @Post(":id")
    @Scopes(ApiScope.CreateAll)
    public async create(
        @Param("id") id: string,
        @Body() body: CreateDiscordVerification,
    ): Promise<IDiscordVerification> {
        return await this.discordVerificationService.create({
            id,
            ...body,
        });
    }

    @Put("my")
    @Scopes(ApiScope.Update)
    public async updateMy(
        @Body() body: UpdateDiscordVerification,
        @AuthenticatedUser() user: IAuthenticatedUser,
    ): Promise<IDiscordVerification> {
        const discordVerification = await this.discordVerificationService.update(user.sub, body);

        if (_.isNull(discordVerification)) {
            throw new NotFoundException();
        }

        return discordVerification;
    }

    @Put(":id")
    @Scopes(ApiScope.UpdateAll)
    public async update(
        @Param("id") id: string,
        @Body() body: UpdateDiscordVerification,
    ): Promise<IDiscordVerification> {
        const discordVerification = await this.discordVerificationService.update(id, body);

        if (_.isNull(discordVerification)) {
            throw new NotFoundException();
        }

        return discordVerification;
    }
}
