import { ensure, IBlogItem, IProfile } from "@synbase/shared";
import { IUrl } from "../model/url.model";

export const Urls = {
    NotFound: {
        path: "/404",
        title: "Nicht gefunden",
    } as IUrl,
    Home: {
        path: "/",
        title: "Startseite",
    } as IUrl,
    Discord: {
        path: "/discord",
        title: "Discord",
    } as IUrl,
    DiscordServer: {
        path: "/discord/server",
        title: "Server",
    } as IUrl,
    DiscordVerify: {
        path: "/discord/verify",
        title: "Verifizieren",
    } as IUrl,
    Twitch: {
        path: "/twitch",
        title: "Twitch",
    } as IUrl,
    Profiles: {
        path: "/profiles",
        title: "Profile",
    },
    ProfileMy: {
        path: "/profiles/my",
        title: "Du",
    },
    Profile: (profile: IProfile): IUrl => ({
        path: `/profiles/${profile.slug}`,
        title: profile.nickname,
    }),
    ProfileRegister: {
        path: "/profiles/register",
        title: "Registrieren",
    } as IUrl,
    Logout: {
        path: "/logout",
        title: "Logout",
    } as IUrl,
    AutoLogout: {
        path: "/logout?auto=true",
        title: "Logout",
    },
    Blog: {
        path: "/blog",
        title: "Blog",
    },
    BlogItem: (blogItem: IBlogItem): IUrl => ({
        path: `/blog/${blogItem.slug}`,
        title: blogItem.title,
    }),
    BlogItemUpdate: (blogItem: IBlogItem): IUrl => ({
        path: `/blog/${blogItem.slug}/edit`,
        title: "Bearbeiten",
    }),
    BlogItemCreate: {
        path: "/blog/new",
        title: "Editor",
    },
};

export const Constants = {
    sessionRefetchInterval: 60 /* seconds */,
};

export const ClientEnv = {
    webUrl: ensure(process.env.NEXT_PUBLIC_WEB_URL),
    apiUrl: ensure(process.env.NEXT_PUBLIC_API_URL),
    apiImageSizeLimit: Number(ensure(process.env.NEXT_PUBLIC_API_IMAGE_SIZE_LIMIT)),
};
