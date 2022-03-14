import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";
import { Image } from "./model/image.entity";

@Module({
    controllers: [ImageController],
    imports: [ConfigModule, HttpModule, TypeOrmModule.forFeature([Image])],
    providers: [ImageService],
    exports: [ImageService],
})
export class ImageModule {}
