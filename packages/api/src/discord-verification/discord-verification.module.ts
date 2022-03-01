import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DiscordVerificationController } from "./discord-verification.controller";
import { DiscordVerificationService } from "./discord-verification.service";

@Module({
    controllers: [DiscordVerificationController],
    imports: [ConfigModule],
    providers: [DiscordVerificationService],
})
export class DiscordVerificationModule {}
