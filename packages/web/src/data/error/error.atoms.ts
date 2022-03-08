import { atom } from "recoil";

export const errorsAtom = atom<Error[]>({
    key: "errors",
    default: [],
});
