import { IBlogItem } from "./blog-item.model";

export type ICreateBlogItem = Pick<IBlogItem, "markdown" | "isDraft" | "subTitle" | "title" | "slug">;
