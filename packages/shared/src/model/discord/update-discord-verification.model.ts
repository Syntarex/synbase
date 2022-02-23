import { IDiscordVerification } from ".";

export type IUpdateDiscordVerification = Partial<
    Pick<IDiscordVerification, "profileId" | "discordUserId" | "verificationCode">
>;
