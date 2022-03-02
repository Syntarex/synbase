import { selector } from "recoil";
import { client } from "../../client/synbase.client";

export const getApp = selector({
    key: "get-app",
    get: async () => await client.app.get(),
});
