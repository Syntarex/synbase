import { ICreateDiscordVerification, IGetDiscordVerification, IUpdateDiscordVerification } from "@synbase/shared";
import _ from "lodash";
import { selector, selectorFamily } from "recoil";
import { v4 as uuid } from "uuid";
import { browserClient } from "../../client/browser.client";

export const getAllDiscordVerifications = selectorFamily({
    key: "get-all-discord-verifications",
    get: (query: IGetDiscordVerification) => async () => await browserClient.discordVerifications.getAll(query),
});

export const getDiscordVerification = selectorFamily({
    key: "get-discord-verification",
    get: (id: string) => async () => await browserClient.discordVerifications.get(id),
});

export const createDiscordVerification = selectorFamily({
    key: "create-discord-verification",
    get: (data: [string, ICreateDiscordVerification]) => async () =>
        await browserClient.discordVerifications.create(data[0], data[1]),
});

export const updateMyDiscordVerification = selectorFamily({
    key: "update-my-discord-verification",
    get: (body: IUpdateDiscordVerification) => async () => await browserClient.discordVerifications.updateMy(body),
});

export const updateDiscordVerification = selectorFamily({
    key: "update-discord-verification",
    get: (data: [string, IUpdateDiscordVerification]) => async () =>
        await browserClient.discordVerifications.update(data[0], data[1]),
});

export const ensureMyDiscordVerification = selector({
    key: "ensure-my-discord-verification",
    get: async () => {
        let result = await browserClient.discordVerifications.getMy();

        if (_.isNull(result)) {
            result = await browserClient.discordVerifications.createMy({
                discordUserId: null,
                verificationCode: uuid(),
            });
        }

        return result;
    },
});
