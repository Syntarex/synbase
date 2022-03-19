import { IBlogItem } from "./blog-item.model";

export type IUpdateBlogItem = Partial<Pick<IBlogItem, "markdown" | "isDraft" | "subTitle" | "title" | "slug">>;
