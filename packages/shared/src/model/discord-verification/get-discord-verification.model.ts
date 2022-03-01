import { IDiscordVerification } from ".";

export type IGetDiscordVerification = Partial<Pick<IDiscordVerification, "discordUserId" | "verificationCode">>;
