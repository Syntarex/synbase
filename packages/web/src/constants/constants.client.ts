import { ensure } from "@synbase/shared";

export const ClientEnv = {
    apiUrl: ensure(process.env.NEXT_PUBLIC_API_URL),
    imagekitUrl: ensure(process.env.NEXT_PUBLIC_IMAGEKIT_URL),
    imagekitPublicKey: ensure(process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY),
};
