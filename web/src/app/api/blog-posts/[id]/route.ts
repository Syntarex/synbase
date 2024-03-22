import "server-only";

import { deleteBlogPost, getBlogPost, updateBlogPost } from "@/data/server/blog-post";
import { idValidation } from "@/model/api";
import { UpsertBlogPost, upsertBlogPostValidation } from "@/model/blog-post";
import { buildRoute } from "@/util/server/api";
import { BlogPost } from "@synbase/database";

export const GET = buildRoute<BlogPost>({
    paramsValidation: idValidation,
    handler: async ({ params }) => await getBlogPost(params.id),
});

export const PUT = buildRoute<BlogPost, UpsertBlogPost>({
    requiredScopes: ["update:blog-posts"],
    paramsValidation: idValidation,
    bodyValidation: upsertBlogPostValidation,
    handler: async ({ body, params }) => await updateBlogPost(params.id, body),
});

export const DELETE = buildRoute<BlogPost>({
    requiredScopes: ["delete:blog-posts"],
    paramsValidation: idValidation,
    handler: async ({ params }) => await deleteBlogPost(params.id),
});
