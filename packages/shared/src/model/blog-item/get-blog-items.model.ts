import { IBlogItem } from "./blog-item.model";

export type IGetBlogItems = Partial<Pick<IBlogItem, "isDraft" | "slug">>;
