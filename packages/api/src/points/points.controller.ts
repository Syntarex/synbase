import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Query } from "@nestjs/common";
import { ApiResource, ApiScope, IPoints } from "@synbase/shared";
import _ from "lodash";
import { AuthenticatedUser, Resource, Scopes } from "nest-keycloak-connect";
import { IAuthenticatedUser } from "../auth/model/authenticated-user.model";
import { CreatePoints } from "./model/create-points.body";
import { GetMyPoints } from "./model/get-my-points.query";
import { GetPoints } from "./model/get-points.query";
import { PointsService } from "./points.service";

const { Points: resource } = ApiResource;

@Controller(resource)
@Resource(resource)
export class PointsController {
    constructor(private readonly pointsService: PointsService) {}

    @Get()
    @Scopes(ApiScope.ReadAll)
    public async getAll(@Query() query: GetPoints): Promise<IPoints[]> {
        return await this.pointsService.getAll(query);
    }

    @Get("my")
    @Scopes(ApiScope.Read)
    public async getAllMy(
        @Query() query: GetMyPoints,
        @AuthenticatedUser() user: IAuthenticatedUser,
    ): Promise<IPoints[]> {
        return await this.pointsService.getAll({
            ...query,
            profileId: user.sub,
        });
    }

    @Get("my/:id")
    @Scopes(ApiScope.Read)
    public async getMy(@Param("id") id: string, @AuthenticatedUser() user: IAuthenticatedUser): Promise<IPoints> {
        const points = await this.pointsService.get(id);

        if (_.isNull(points) || !_.isEqual(points.profileId, user.sub)) {
            throw new NotFoundException();
        }

        return points;
    }

    @Get(":id")
    @Scopes(ApiScope.ReadAll)
    public async get(@Param("id") id: string): Promise<IPoints> {
        const points = await this.pointsService.get(id);

        if (_.isNull(points)) {
            throw new NotFoundException();
        }

        return points;
    }

    @Post()
    @Scopes(ApiScope.CreateAll)
    public async create(@Body() body: CreatePoints): Promise<IPoints> {
        return await this.pointsService.create(body);
    }

    @Delete()
    @Scopes(ApiScope.DeleteAll)
    public async delete(@Param("id") id: string): Promise<void> {
        const result = await this.pointsService.delete(id);

        if (!result) {
            throw new NotFoundException();
        }
    }
}
