import "server-only";

import { GetBlogPosts, UpsertBlogPost } from "@/model/blog-post";
import { cache, purgeCache } from "@/util/server/cache";
import Database from "@synbase/database";

export const getBlogPosts = cache({
    cacheKey: "blog-posts",
    cacheFn: async (where: GetBlogPosts = {}) => await Database.blogPost.findMany({ where }),
});

export const getBlogPost = cache({
    cacheKey: "blog-posts",
    cacheFn: async (id: string) => await Database.blogPost.findUnique({ where: { id } }),
});

export const createBlogPost = async (data: UpsertBlogPost) => {
    const result = await Database.blogPost.create({
        data,
    });

    purgeCache("blog-posts");

    return result;
};

export const updateBlogPost = async (id: string, data: UpsertBlogPost) => {
    const result = await Database.blogPost.update({ data, where: { id } });

    purgeCache("blog-posts");

    return result;
};

export const deleteBlogPost = async (id: string) => {
    const result = await Database.blogPost.delete({ where: { id } });

    purgeCache("blog-posts");

    return result;
};
