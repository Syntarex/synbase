import { IBlogItem } from "./blog-item.model";

export type IUpdateBlogItem = Partial<Pick<IBlogItem, "content" | "isDraft" | "summary" | "title" | "slug" | "format">>;
