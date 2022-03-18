import { DiscordVerificationConstants, IUpdateDiscordVerification } from "@synbase/shared";
import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";
import { IsNullable } from "../../util/validation/is-nullable.decorator";
import { IsUndefinedable } from "../../util/validation/is-undefinedable.decorator";

const { DISCORD_USER_ID_LENGTH } = DiscordVerificationConstants;

export class UpdateDiscordVerification implements IUpdateDiscordVerification {
    @IsUndefinedable()
    @IsNullable()
    @IsString()
    @IsNotEmpty()
    @MaxLength(DISCORD_USER_ID_LENGTH)
    discordUserId?: string | null;

    @IsUndefinedable()
    @IsUUID()
    verificationCode?: string;
}
