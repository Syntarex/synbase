import "server-only";

import { createBlogPost, getBlogPosts } from "@/data/server/blog-post";
import { UpsertBlogPost, getBlogPostsValidation, upsertBlogPostValidation } from "@/model/blog-post";
import { buildRoute } from "@/util/server/api";
import { BlogPost } from "@synbase/database";

export const GET = buildRoute<BlogPost[]>({
    searchParamsValidation: getBlogPostsValidation,
    handler: async ({ searchParams }) => await getBlogPosts(searchParams),
});

export const POST = buildRoute<BlogPost, UpsertBlogPost>({
    requiredScopes: ["create:blog-post"],
    bodyValidation: upsertBlogPostValidation,
    handler: async ({ body }) => await createBlogPost(body),
});
