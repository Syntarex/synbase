import "server-only";

import { Markdown } from "@/component/common/markdown";
import { PageProps } from "@/model/next";
import { Paper, Stack, Typography } from "@mui/material";
import Database from "@synbase/database";
import dayjs from "dayjs";
import { notFound } from "next/navigation";

/**
 * Zeigt einen Blog-Beitrag an.
 */
const BlogPost = async (props: PageProps<{ slug: string }>) => {
    const { slug } = props.params;

    const blogPost = await Database.blogPost.findUnique({
        where: {
            slug,
        },
    });

    if (!blogPost) {
        return notFound();
    }

    return (
        <Stack spacing={4}>
            <Stack spacing={1}>
                <Typography variant={"h1"}>{blogPost.title}</Typography>

                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography variant={"body2"} fontWeight={600}>
                        Syntarex, {dayjs(blogPost.createdAt).format("DD. MMMM YYYY")}
                    </Typography>
                </Stack>
            </Stack>

            <Typography>{blogPost.description}</Typography>

            <Paper sx={{ p: 4 }}>
                <Markdown>{blogPost.content}</Markdown>
            </Paper>
        </Stack>
    );
};

export default BlogPost;
