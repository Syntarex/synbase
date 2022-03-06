import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";

@Module({
    controllers: [ImageController],
    imports: [ConfigModule],
    providers: [ImageService],
    exports: [ImageService],
})
export class ImageModule {}
