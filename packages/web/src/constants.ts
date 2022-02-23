import { ensure } from "@synbase/shared";

export const Env = {
    apiUrl: ensure(process.env.API_URL),
};
