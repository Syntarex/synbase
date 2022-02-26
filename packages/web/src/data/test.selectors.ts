import { selector } from "recoil";
import { clientSynbase } from "../client/synbase.client";

export const testFetch = selector({
    key: "test-fetch",
    get: async () => await clientSynbase.app.get(),
});
