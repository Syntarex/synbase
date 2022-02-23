import { IDiscordVerification } from ".";

export type IGetDiscordVerification = Partial<
    Pick<IDiscordVerification, "profileId" | "discordUserId" | "verificationCode">
>;
