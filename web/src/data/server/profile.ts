import "server-only";

import { auth0 } from "@/util/server/auth0";
import { cache } from "@/util/server/cache";
import Database from "@synbase/database";

export const getMe = cache({
    cacheKey: "profiles",
    cacheFn: async () => {
        // Die Sitzung des Benutzers
        const session = await auth0.getSession();

        // Es gibt keine Sitzung
        if (!session) {
            return null;
        }

        // Der Identifier des Benutzers
        const { sub } = session.user;

        // Das Profil des Benutzers
        const profile = await Database.profile.findUnique({
            where: {
                sub,
            },
        });

        return profile;
    },
});

export const getProfiles = cache({
    cacheKey: "profiles",
    cacheFn: async () => await Database.profile.findMany(),
});

export const getProfile = cache({
    cacheKey: "profiles",
    cacheFn: async (id: string) => await Database.profile.findUnique({ where: { id } }),
});
