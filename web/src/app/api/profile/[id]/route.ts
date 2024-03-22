import "server-only";

import { getMe, getProfile } from "@/data/server/profile";
import { getProfileValidation } from "@/model/profile";
import { buildRoute } from "@/util/server/api";
import { Profile } from "@synbase/database";

export const GET = buildRoute<Profile>({
    searchParamsValidation: getProfileValidation,
    handler: async ({ params }) => {
        if (params.id === "me") {
            return await getMe();
        }

        return await getProfile(params.id);
    },
});
