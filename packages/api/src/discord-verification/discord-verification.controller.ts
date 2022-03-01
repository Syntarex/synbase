import {
    Body,
    ConflictException,
    Controller,
    Get,
    Logger,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
} from "@nestjs/common";
import { ApiResource, ApiScope, IDiscordVerification } from "@synbase/shared";
import { AuthenticatedUser, Resource, Scopes } from "nest-keycloak-connect";
import { IAuthenticatedUser } from "../auth/model/authenticated-user.model";
import { CreateDiscordVerification } from "./model/create-discord-verification.body";
import { DiscordVerification } from "./model/discord-verification.entity";
import { GetDiscordVerification } from "./model/get-discord-verification.query";

@Controller(ApiResource.DiscordVerification)
@Resource(ApiResource.DiscordVerification)
export class DiscordVerificationController {
    @Post()
    @Scopes(ApiScope.Create, ApiScope.CreateAll)
    public async create(
        @Body() body: CreateDiscordVerification,
        @AuthenticatedUser() user: IAuthenticatedUser,
    ): Promise<IDiscordVerification> {
        Logger.log(body, "DiscordVerificationController");
        Logger.log(user, "DiscordVerificationController");

        throw new ConflictException();
    }

    @Get()
    @Scopes(ApiScope.Read, ApiScope.ReadAll)
    public async getAll(
        @Query() query: GetDiscordVerification,
        @AuthenticatedUser() user: IAuthenticatedUser,
    ): Promise<DiscordVerification[]> {
        Logger.log(query, "DiscordVerificationController");
        Logger.log(user, "DiscordVerificationController");

        throw new NotFoundException();
    }

    @Get(":id")
    @Scopes(ApiScope.Read, ApiScope.ReadAll)
    public async get(
        @Param("id") id: string,
        @AuthenticatedUser() user: IAuthenticatedUser,
    ): Promise<DiscordVerification> {
        Logger.log(id, "DiscordVerificationController");
        Logger.log(user, "DiscordVerificationController");

        throw new NotFoundException();
    }

    @Put(":id")
    @Scopes(ApiScope.Update, ApiScope.UpdateAll)
    public async update(
        @Param("id") id: string,
        @AuthenticatedUser() user: IAuthenticatedUser,
    ): Promise<DiscordVerification> {
        Logger.log(id, "DiscordVerificationController");
        Logger.log(user, "DiscordVerificationController");

        throw new NotFoundException();
    }
}
