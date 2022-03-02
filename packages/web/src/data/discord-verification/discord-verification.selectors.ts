import { IDiscordVerification, IGetDiscordVerification } from "@synbase/shared";
import { selectorFamily } from "recoil";
import { client } from "../../client/synbase.client";

export const getAllDiscordVerifications = selectorFamily<IDiscordVerification[], IGetDiscordVerification>({
    key: "get-all-discord-verifications",
    get: (query) => async () => await client.discordVerifications.getAll(query),
});
