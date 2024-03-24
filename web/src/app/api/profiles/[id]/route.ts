import "server-only";

import { ensureProfileBySub, getProfile } from "@/data/server/profile";
import { getProfileValidation } from "@/model/profile";
import { buildRoute } from "@/util/server/api";
import { auth0 } from "@/util/server/auth0";
import { ensure } from "@/util/string";
import { Profile } from "@synbase/database";

export const GET = buildRoute<Profile>({
    searchParamsValidation: getProfileValidation,
    handler: async ({ params }) => {
        if (params.id === "me") {
            // Die Sitzung des Benutzers
            const session = await auth0.getSession();

            // Es gibt keine Sitzung
            if (!session) {
                return null;
            }

            // TODO: Erstelle User-Model - Übergebe komplettes User-Objekt - Übernehme Nickname, Profilbild etc.
            return await ensureProfileBySub(ensure(session.user.sub));
        }

        return await getProfile(params.id);
    },
});
