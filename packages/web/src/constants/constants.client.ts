import { ensure } from "@synbase/shared";
import { IUrl } from "../model/url.model";

export const Urls: { [index: string]: IUrl } = {
    NotFound: {
        path: "/404",
        title: "Nicht gefunden",
    },
    Home: {
        path: "/",
        title: "Startseite",
    },
    Discord: {
        path: "/discord",
        title: "Discord",
    },
    DiscordServer: {
        path: "/discord/server",
        title: "Server",
    },
    DiscordVerify: {
        path: "/discord/verify",
        title: "Verifizieren",
    },
    Twitch: {
        path: "/twitch",
        title: "Twitch",
    },
    Profile: {
        path: "/profile",
        title: "Profil",
    },
};

export const ClientEnv = {
    apiUrl: ensure(process.env.NEXT_PUBLIC_API_URL),
    imagekitUrl: ensure(process.env.NEXT_PUBLIC_IMAGEKIT_URL),
    imagekitPublicKey: ensure(process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY),
};
