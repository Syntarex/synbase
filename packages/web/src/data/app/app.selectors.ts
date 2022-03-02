import { selector } from "recoil";
import { browserClient } from "../../client/browser.client";

export const getApp = selector({
    key: "get-app",
    get: async () => await browserClient.app.get(),
});
