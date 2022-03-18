import { ITag } from "./tag.model";

export type IUpdateTag = Partial<Pick<ITag, "slug" | "title">>;
