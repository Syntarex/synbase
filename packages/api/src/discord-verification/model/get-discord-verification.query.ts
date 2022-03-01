import { IGetDiscordVerification } from "@synbase/shared";
import { IsString, IsUUID, MaxLength } from "class-validator";
import { IsNullable } from "../../util/validation/is-nullable.decorator";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";
import { DiscordVerification } from "./discord-verification.entity";

export class GetDiscordVerification implements IGetDiscordVerification {
    @IsUndefinedable()
    @IsNullable()
    @IsString()
    @MaxLength(DiscordVerification.DISCORD_USER_ID_LENGTH)
    discordUserId?: string | null;

    @IsUndefinedable()
    @IsNullable()
    @IsUUID()
    verificationCode?: string;
}
