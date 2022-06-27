import { ensure } from "@synbase/shared";

export const SERVER_ENV = {
    API_URL: ensure(process.env.API_URL),
    WEB_URL: ensure(process.env.WEB_URL),
};
