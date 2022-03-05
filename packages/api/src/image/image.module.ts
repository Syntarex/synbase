import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImageService } from "./image.service";
import { Image } from "./model/image.entity";

@Module({
    controllers: [],
    imports: [ConfigModule, TypeOrmModule.forFeature([Image])],
    providers: [ImageService],
})
export class ImageModule {}
