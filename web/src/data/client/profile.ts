"use client";

import { api } from "@/util/client/api";
import { Profile } from "@synbase/database";
import { FetchQueryOptions } from "@tanstack/react-query";

export const getProfilesQuery = (): FetchQueryOptions<Profile[]> => ({
    queryKey: ["profiles"],
    queryFn: async () => await api.get("profiles").json(),
});

export const getProfileQuery = (id: "me" | string): FetchQueryOptions<Profile | null> => ({
    queryKey: ["profiles", id],
    queryFn: async () => {
        if (!id) {
            return null;
        }

        return await api.get(`profiles/${id}`).json();
    },
});
