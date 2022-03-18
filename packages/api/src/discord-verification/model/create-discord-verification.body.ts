import { DiscordVerificationConstants, ICreateDiscordVerification } from "@synbase/shared";
import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";
import { IsNullable } from "../../util/validation/is-nullable.decorator";

const { DISCORD_USER_ID_LENGTH } = DiscordVerificationConstants;

export class CreateDiscordVerification implements ICreateDiscordVerification {
    @IsNullable()
    @IsString()
    @IsNotEmpty()
    @MaxLength(DISCORD_USER_ID_LENGTH)
    discordUserId: string | null;

    @IsUUID()
    verificationCode: string;
}
