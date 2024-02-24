"use server";

import { Markdown } from "@/component/common/markdown";
import { Test } from "@/component/test";
import { PageProps } from "@/model/next";
import { Paper, Stack, Typography } from "@mui/material";
import Database from "@synbase/database";

/**
 * Zeigt einen Blog-Beitrag an.
 */
const Blog = async (props: PageProps<{ slug: string }>) => {
    const { slug } = props.params;

    const blogPost = await Database.blogPost.findUnique({
        where: {
            slug,
        },
    });

    if (!blogPost) {
        return <Test slug={slug} />;
    }

    return (
        <Stack gap={4}>
            <Typography variant={"h1"}>{blogPost.title}</Typography>
            <Typography>{blogPost.description}</Typography>
            <Paper>
                <Markdown>{blogPost.content}</Markdown>
            </Paper>
        </Stack>
    );
};

export default Blog;
