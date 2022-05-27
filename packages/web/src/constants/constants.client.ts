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
    } as IUrl,
    MyProfile: {
        path: "/profiles/my",
        title: "Du",
    } as IUrl,
    Profile: (profile: Pick<IProfile, "slug" | "nickname">): IUrl => ({
        path: `/profiles/${profile.slug}`,
        title: profile.nickname,
    }),
    Register: {
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
    } as IUrl,
    ApiLogout: {
        /* Wird augerufen um die KeyCloak Session abzubauen */
        path: "/api/auth/logout",
        title: "KeyCloak Logout",
    } as IUrl,
    Blog: {
        path: "/blog",
        title: "Blog",
    } as IUrl,
    BlogItem: (blogItem: Pick<IBlogItem, "slug" | "title">): IUrl => ({
        path: `/blog/${blogItem.slug}`,
        title: blogItem.title,
    }),
    EditBlogItem: (blogItem: Pick<IBlogItem, "slug" | "title">): IUrl => ({
        path: `/blog/${blogItem.slug}/edit`,
        title: `Bearbeite ${blogItem.title}`,
    }),
    NewBlogItem: {
        path: "/blog/new",
        title: "Editor",
    } as IUrl,
};

export const Constants = {
    sessionRefetchInterval: 60 /* seconds */,
};

export const ClientEnv = {
    webUrl: ensure(process.env.NEXT_PUBLIC_WEB_URL),
    apiUrl: ensure(process.env.NEXT_PUBLIC_API_URL),
    apiImageSizeLimit: Number(ensure(process.env.NEXT_PUBLIC_API_IMAGE_SIZE_LIMIT)),
};
