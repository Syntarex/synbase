"use client";

import { BlogPostForm } from "@/component/blog/blog-post-form";
import { getProfileQuery } from "@/data/client/profile";
import { Stack, Typography } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const AdminCreateBlogPostPage = () => {
    const { data: me } = useSuspenseQuery(getProfileQuery("me"));

    const { refresh } = useRouter();

    if (!me) {
        return null;
    }

    return (
        <Stack gap={4}>
            <Typography variant={"h1"}>Beitrag verfassen</Typography>

            <BlogPostForm
                value={{
                    content: "",
                    description: "",
                    isDraft: true,
                    slug: "",
                    title: "",
                    authorId: me.id,
                }}
                onSuccess={() => refresh()}
            />
        </Stack>
    );
};

export default AdminCreateBlogPostPage;
