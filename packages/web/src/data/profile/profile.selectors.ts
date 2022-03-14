import { ApiResource, IGetProfiles, IProfile } from "@synbase/shared";
import { SynbaseQuery } from "../../model/client/synbase.query";

export const getAllProfiles: SynbaseQuery<IProfile[], IGetProfiles> = (synbase, query) => ({
    queryKey: [ApiResource.Profile],
    queryFn: () => synbase.profiles.getAll(query),
});

export const getProfile: SynbaseQuery<IProfile | null, string> = (synbase, id) => ({
    queryKey: [ApiResource.Profile, id],
    queryFn: () => synbase.profiles.get(id),
});

export const getProfileBySlug: SynbaseQuery<IProfile | null, string> = (synbase, slug) => ({
    queryKey: [ApiResource.Profile, slug],
    queryFn: () => synbase.profiles.getBySlug(slug),
});

export const getMyProfile: SynbaseQuery<IProfile | null> = (synbase) => ({
    queryKey: [ApiResource.Profile, "my"],
    queryFn: () => synbase.profiles.getMy(),
});
