import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Points } from "./model/points.entity";
import { PointsController } from "./points.controller";
import { PointsService } from "./points.service";

@Module({
    controllers: [PointsController],
    imports: [ConfigModule, TypeOrmModule.forFeature([Points])],
    providers: [PointsService],
})
export class PointsModule {}
