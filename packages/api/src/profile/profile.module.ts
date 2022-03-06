import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImageModule } from "../image/image.module";
import { Profile } from "./model/profile.entity";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";

@Module({
    controllers: [ProfileController],
    imports: [ConfigModule, ImageModule, TypeOrmModule.forFeature([Profile])],
    providers: [ProfileService],
})
export class ProfileModule {}
