import { IDiscordVerification } from "@synbase/shared";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class DiscordVerification implements IDiscordVerification {
    public static DISCORD_USER_ID_LENGTH = 20;
    public static PROFILE_ID_LENGTH = 128;
    public static VERIFICATION_CODE_LENGTH = 32;

    @Column({ type: "varchar", length: DiscordVerification.DISCORD_USER_ID_LENGTH, nullable: true })
    discordUserId: string | null;

    @PrimaryColumn({ type: "varchar", length: DiscordVerification.PROFILE_ID_LENGTH })
    profileId: string;

    @Column({ type: "uuid", length: DiscordVerification.VERIFICATION_CODE_LENGTH })
    verificationCode: string;
}
