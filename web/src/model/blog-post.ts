import { Prisma } from "@synbase/database";
import { boolean, object, string } from "yup";
import { SearchParams } from "./api";

export type GetBlogPosts = SearchParams<Prisma.BlogPostWhereInput, "authorId">;
export type UpsertBlogPost = Pick<
    Prisma.BlogPostUncheckedCreateInput,
    "id" | "authorId" | "content" | "description" | "isDraft" | "slug" | "title"
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
    authorId: string().required().uuid(),
});
