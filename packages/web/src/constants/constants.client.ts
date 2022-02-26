import { ensure } from "@synbase/shared";

export const ClientEnv = {
    apiUrl: ensure(process.env.NEXT_PUBLIC_API_URL),
};
