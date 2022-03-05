import { IUpdateDiscordVerification } from "@synbase/shared";
import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";
import { IsNullable } from "../../util/validation/is-nullable.decorator";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";
import { DiscordVerification } from "./discord-verification.entity";

export class UpdateDiscordVerification implements IUpdateDiscordVerification {
    @IsUndefinedable()
    @IsNullable()
    @IsString()
    @IsNotEmpty()
    @MaxLength(DiscordVerification.DISCORD_USER_ID_LENGTH)
    discordUserId?: string | null;

    @IsUndefinedable()
    @IsUUID()
    verificationCode?: string;
}
