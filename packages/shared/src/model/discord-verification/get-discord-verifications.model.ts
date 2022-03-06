import { IDiscordVerification } from ".";

export type IGetDiscordVerifications = Partial<Pick<IDiscordVerification, "discordUserId" | "verificationCode">>;
