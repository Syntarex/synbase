import { IResource } from "..";

export interface IDiscordVerification extends IResource {
    discordUserId: string | null;
    verificationCode: string;
}
