import { ICreateProfile, IGetProfiles, IUpdateProfile } from "@synbase/shared";
import { selector, selectorFamily } from "recoil";
import { browserClient } from "../../client/browser.client";

export const getAllProfiles = selectorFamily({
    key: "get-all-profiles",
    get: (query: IGetProfiles) => async () => await browserClient.profiles.getAll(query),
});

export const getProfile = selectorFamily({
    key: "get-profile",
    get: (id: string) => async () => await browserClient.profiles.get(id),
});

export const getProfileBySlug = selectorFamily({
    key: "get-profile-by-slug",
    get: (slug: string) => async () => await browserClient.profiles.getBySlug(slug),
});

export const getMyProfile = selector({
    key: "get-my-profile",
    get: async () => await browserClient.profiles.getMy(),
});

export const createMyProfile = selectorFamily({
    key: "create-my-profile",
    get: (body: ICreateProfile) => async () => await browserClient.profiles.createMy(body),
});

export const updateMyProfile = selectorFamily({
    key: "update-my-profile",
    get: (body: IUpdateProfile) => async () => await browserClient.profiles.updateMy(body),
});

export const updateProfile = selectorFamily({
    key: "update-profile",
    get: (data: [string, IUpdateProfile]) => async () => await browserClient.profiles.update(data[0], data[1]),
});

export const deleteMyProfile = selector({
    key: "delete-my-profile",
    get: async () => await browserClient.profiles.deleteMy(),
});

export const deleteProfile = selectorFamily({
    key: "delete-profile",
    get: (id: string) => async () => await browserClient.profiles.delete(id),
});

export const getMyProfileImage = selector({
    key: "get-my-profile-image",
    get: async () => await browserClient.profiles.getMyImage(),
});

export const getProfileImage = selectorFamily({
    key: "get-profile-image",
    get: (id: string) => () => browserClient.profiles.getImage(id),
});
