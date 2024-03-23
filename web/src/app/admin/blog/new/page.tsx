"use client";

import { BlogPostForm } from "@/component/blog/blog-post-form";
import { Stack, Typography } from "@mui/material";
import { Prisma } from "@synbase/database";
import { useCallback } from "react";

const AdminNewBlogPostPage = () => {
    const onSubmit = useCallback(
        (blogPost: Prisma.BlogPostCreateWithoutAuthorInput) =>
            // TODO: Nutze React Query
            fetch("/api/blog-post", { method: "POST", body: JSON.stringify(blogPost) }),
        [],
    );

    return (
        <Stack spacing={2}>
            <Typography variant={"h1"}>Beitrag verfassen</Typography>

            <BlogPostForm
                value={{
                    content: "",
                    description: "",
                    isDraft: true,
                    slug: "",
                    title: "",
                }}
                onSubmit={onSubmit}
            />
        </Stack>
    );
};

export default AdminNewBlogPostPage;
