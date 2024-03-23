"use client";

import { GetBlogPosts, UpsertBlogPost } from "@/model/blog-post";
import { api } from "@/util/client/api";
import { getQueryClient } from "@/util/client/query-client";
import { BlogPost } from "@synbase/database";
import { FetchQueryOptions, MutationOptions } from "@tanstack/react-query";

export const getBlogPostsQuery = (where: GetBlogPosts = {}): FetchQueryOptions<BlogPost[]> => ({
    queryKey: ["blog-posts", where],
    queryFn: async () =>
        await api
            .get("blog-posts", {
                searchParams: where,
            })
            .json(),
});

export const getBlogPostQuery = (id: string): FetchQueryOptions<BlogPost | null> => ({
    queryKey: ["blog-posts", id],
    queryFn: async () => {
        if (!id) {
            return null;
        }

        return await api.get(`blog-posts/${id}`).json();
    },
});

export const upsertBlogPostMutation: MutationOptions<BlogPost, Error, UpsertBlogPost> = {
    mutationKey: ["blog-posts", "upsert"],
    mutationFn: async (body) => {
        if (body.id) {
            return await api.put(`blog-posts/${body.id}`, { json: body }).json();
        }

        return await api
            .post("blog-posts", {
                json: body,
            })
            .json();
    },
    onSuccess: () => {
        getQueryClient().invalidateQueries({ queryKey: ["blog-posts"] });
    },
};

export const deleteBlogPostMutation: MutationOptions<BlogPost, Error, string> = {
    mutationKey: ["blog-posts", "delete"],
    mutationFn: async (id) => await api.delete(`blog-posts/${id}`).json(),
    onSuccess: () => {
        getQueryClient().invalidateQueries({ queryKey: ["blog-posts"] });
    },
};
