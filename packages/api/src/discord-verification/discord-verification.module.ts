import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DiscordVerificationService } from "./discord-verification.service";

@Module({
    imports: [ConfigModule],
    providers: [DiscordVerificationService],
})
export class DiscordVerificationModule {}
