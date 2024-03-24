import "server-only";

import { cache } from "@/util/server/cache";
import Database from "@synbase/database";

export const getProfiles = cache({
    cacheKey: "profiles",
    cacheFn: async () => await Database.profile.findMany(),
});

export const getProfile = cache({
    cacheKey: "profiles",
    cacheFn: async (id: string) => await Database.profile.findUnique({ where: { id } }),
});

export const ensureProfileBySub = cache({
    cacheKey: "profiles",
    cacheFn: async (sub: string) => {
        const profile = await Database.profile.findUnique({
            where: {
                sub,
            },
        });

        if (!profile) {
            return await Database.profile.create({
                data: {
                    sub,
                },
            });
        }

        return profile;
    },
});
