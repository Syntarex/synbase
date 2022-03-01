import { selector } from "recoil";
import { synbase } from "../../client/synbase.client";

export const getApp = selector({
    key: "get-app",
    get: async () => await synbase.app.get(),
});
