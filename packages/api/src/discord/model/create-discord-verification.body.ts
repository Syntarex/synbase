import { ICreateDiscordVerification } from "@synbase/shared";
import { IsString, IsUUID, MaxLength } from "class-validator";
import { IsNullable } from "../../util/validation/is-nullable.decorator";
import { DiscordVerification } from "./discord-verification.entity";

export class CreateDiscordVerification implements ICreateDiscordVerification {
    @IsNullable()
    @IsString()
    @MaxLength(DiscordVerification.DISCORD_USER_ID_LENGTH)
    discordUserId: string | null;

    @IsString()
    @MaxLength(DiscordVerification.PROFILE_ID_LENGTH)
    profileId: string;

    @IsString()
    @IsUUID()
    verificationCode: string;
}
