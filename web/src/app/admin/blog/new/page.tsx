"use client";

import { BlogPostForm } from "@/component/blog/blog-post-form";
import { getProfileQuery } from "@/data/client/profile";
import { Stack, Typography } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";

const AdminNewBlogPostPage = () => {
    const { data: me } = useSuspenseQuery(getProfileQuery("me"));

    if (!me) {
        return null;
    }

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
                    author: { connect: me },
                }}
            />
        </Stack>
    );
};

export default AdminNewBlogPostPage;
