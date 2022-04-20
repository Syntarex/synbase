export { BlogItemFormat, IBlogItem } from "./blog-item.model";
export { ICreateBlogItem } from "./create-blog-item.model";
export { IGetBlogItems } from "./get-blog-items.model";
export { IUpdateBlogItem } from "./update-blog-item.model";

export const BlogItemConstants = {
    TITLE_LENGTH: 56 /* TODO: Maximale title länge für Google einsetzen */,
    SUMMARY_LENGTH: 128 /* TODO: Maximale description länge für Google einsetzen */,
    SLUG_MIN_LENGTH: 3,
    SLUG_MAX_LENGTH: 32,
    SLUG_REGEX: new RegExp(
        "^[a-z0-9]+(?:-[a-z0-9]+)*$",
    ) /* TODO: Diese Konstanten gibt es beim Profil schon. Refactore! */,
};
