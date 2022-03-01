import { IDiscordVerification } from "@synbase/shared";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { Length } from "../../constants";
import { Resource } from "../../util/model/resource.entity";

@Entity()
export class DiscordVerification extends Resource implements IDiscordVerification {
    public static DISCORD_USER_ID_LENGTH = 20;
    public static VERIFICATION_CODE_LENGTH = 32;

    @PrimaryColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: DiscordVerification.DISCORD_USER_ID_LENGTH, nullable: true })
    discordUserId: string | null;

    @Column({ type: "uuid", length: Length.UUID })
    verificationCode: string;
}
