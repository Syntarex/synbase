"use client";

import { BlogPostForm } from "@/component/blog/blog-post-form";
import { getBlogPostQuery } from "@/data/client/blog-post";
import { PageProps } from "@/model/next";
import { Stack, Typography } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// TODO: Delete-Button
const AdminUpdateBlogPostPage = ({ params }: PageProps<{ id: string }>) => {
    const { data: blogPost } = useSuspenseQuery(getBlogPostQuery(params.id));

    const { refresh } = useRouter();

    if (!blogPost) {
        return null;
    }

    return (
        <Stack spacing={2}>
            <Typography variant={"h1"}>Beitrag bearbeiten</Typography>

            <BlogPostForm
                value={{
                    id: blogPost.id,
                    authorId: blogPost.authorId,
                    content: blogPost.content,
                    description: blogPost.description,
                    slug: blogPost.slug,
                    title: blogPost.title,
                    isDraft: blogPost.isDraft,
                }}
                onSuccess={() => refresh()}
            />
        </Stack>
    );
};

export default AdminUpdateBlogPostPage;