import { Prisma } from "@synbase/database";
import { boolean, object, string } from "yup";
import { Where } from "./api";

export type GetBlogPosts = Where<Prisma.BlogPostWhereInput, "authorId">;
export type UpsertBlogPost = Pick<
    Prisma.BlogPostCreateInput,
    "id" | "author" | "content" | "description" | "isDraft" | "slug" | "title"
>;

export const getBlogPostsValidation = object<GetBlogPosts>({
    authorId: string().uuid(),
});

export const upsertBlogPostValidation = object<UpsertBlogPost>({
    content: string().required(),
    description: string().required().max(150), // Wird als meta-description verwendet, entsprechend, sollte die Beschreibung nicht mehr als 150 Zeichen lang sein
    isDraft: boolean().required(),
    slug: string().required().min(4).max(60),
    title: string().required().min(4).max(60),
});
