import { ensure } from "@synbase/shared";
import { IUrl } from "../model/url.model";

export const URLS = {
    NOT_FOUND: {
        path: "/404",
        title: "Nicht gefunden",
    } as IUrl,
    HOME: {
        path: "/",
        title: "Startseite",
    } as IUrl,
};

export const CLIENT_ENV = {
    WEB_URL: ensure(process.env.NEXT_PUBLIC_WEB_URL),
    API_URL: ensure(process.env.NEXT_PUBLIC_API_URL),
    API_IMAGE_SIZE_LIMIT: Number(ensure(process.env.NEXT_PUBLIC_API_IMAGE_SIZE_LIMIT)),
    AUTH0_DOMAIN: ensure(process.env.NEXT_PUBLIC_AUTH0_DOMAIN),
    AUTH0_CLIENT_ID: ensure(process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID),
    AUTH0_AUDIENCE: ensure(process.env.NEXT_PUBLIC_AUTH0_AUDIENCE),
};
