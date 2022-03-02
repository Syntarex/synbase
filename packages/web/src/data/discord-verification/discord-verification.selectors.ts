import { IDiscordVerification, IGetDiscordVerification } from "@synbase/shared";
import { selectorFamily } from "recoil";
import { browserClient } from "../../client/browser.client";

export const getAllDiscordVerifications = selectorFamily<IDiscordVerification[], IGetDiscordVerification>({
    key: "get-all-discord-verifications",
    get: (query) => async () => await browserClient.discordVerifications.getAll(query),
});
