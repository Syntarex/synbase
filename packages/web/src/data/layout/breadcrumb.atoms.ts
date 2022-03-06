import { atom } from "recoil";
import { IUrl } from "../../model/url.model";

export const breadcrumbAtom = atom<IUrl[]>({
    key: "breadcrumb",
    default: [],
});
