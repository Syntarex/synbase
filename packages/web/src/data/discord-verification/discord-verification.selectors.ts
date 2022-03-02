import {
    ICreateDiscordVerification,
    IDiscordVerification,
    IGetDiscordVerification,
    IUpdateDiscordVerification,
} from "@synbase/shared";
import { selector, selectorFamily } from "recoil";
import { v4 as uuid } from "uuid";
import { browserClient } from "../../client/browser.client";

export const getAllDiscordVerifications = selectorFamily<IDiscordVerification[], IGetDiscordVerification>({
    key: "get-all-discord-verifications",
    get: (query) => async () => await browserClient.discordVerifications.getAll(query),
});

export const getMyDiscordVerification = selector<IDiscordVerification>({
    key: "get-my-discord-verification",
    get: async () => await browserClient.discordVerifications.getMy(),
});

export const getDiscordVerification = selectorFamily<IDiscordVerification, string>({
    key: "get-discord-verification",
    get: (id) => async () => await browserClient.discordVerifications.get(id),
});

export const createMyDiscordVerification = selectorFamily<IDiscordVerification, ICreateDiscordVerification>({
    key: "create-my-discord-verification",
    get: (body) => async () => await browserClient.discordVerifications.createMy(body),
});

export const createDiscordVerification = selectorFamily<IDiscordVerification, [string, ICreateDiscordVerification]>({
    key: "create-discord-verification",
    get: (data) => async () => await browserClient.discordVerifications.create(data[0], data[1]),
});

export const updateMyDiscordVerification = selectorFamily<IDiscordVerification, IUpdateDiscordVerification>({
    key: "update-my-discord-verification",
    get: (body) => async () => await browserClient.discordVerifications.updateMy(body),
});

export const updateDiscordVerification = selectorFamily<IDiscordVerification, [string, IUpdateDiscordVerification]>({
    key: "update-discord-verification",
    get: (data) => async () => await browserClient.discordVerifications.update(data[0], data[1]),
});

export const ensureMyDiscordVerification = selector<IDiscordVerification>({
    key: "ensure-my-discord-verification",
    get: async () => {
        let discordVerification: IDiscordVerification | undefined;

        try {
            discordVerification = await browserClient.discordVerifications.getMy();
        } catch (ex) {
            discordVerification = await browserClient.discordVerifications.createMy({
                discordUserId: null,
                verificationCode: uuid(),
            });
        }

        return discordVerification;
    },
});
