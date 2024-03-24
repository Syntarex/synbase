import "server-only";

import { getProfiles } from "@/data/server/profile";
import { buildRoute } from "@/util/server/api";
import { Profile } from "@synbase/database";

export const GET = buildRoute<Profile[]>({
    handler: async () => await getProfiles(),
});
