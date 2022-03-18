import { ITag } from "./tag.model";

export type ICreateTag = Pick<ITag, "slug" | "title">;
