import { IBlogItem } from "./blog-item.model";

export type ICreateBlogItem = Pick<IBlogItem, "content" | "isDraft" | "summary" | "title" | "slug" | "format">;
