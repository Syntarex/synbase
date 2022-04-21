import yup from "yup";

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

const { TITLE_LENGTH, SUMMARY_LENGTH, SLUG_MAX_LENGTH, SLUG_MIN_LENGTH, SLUG_REGEX } = BlogItemConstants;

export const BlogItemValidation = yup.object({
    title: yup
        .string()
        .max(TITLE_LENGTH, `Mach mal halblang! Maximale Zeichenanzahl: ${TITLE_LENGTH}`)
        .required("Schenk mir bitte Beachtung. <3"),
    summary: yup.string().max(SUMMARY_LENGTH, `Mach mal halblang! Maximale Zeichenanzahl: ${TITLE_LENGTH}`),
    slug: yup
        .string()
        .max(SLUG_MAX_LENGTH, `Mach mal halblang! Maximale Zeichenanzahl: ${SLUG_MAX_LENGTH}`)
        .min(SLUG_MIN_LENGTH, `Sprich bitte lauter. Minimale Zeichenanzahl: ${SLUG_MIN_LENGTH}`)
        .required("Schenk mir bitte Beachtung. <3")
        .matches(SLUG_REGEX),
});
