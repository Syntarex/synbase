import "server-only";

import { Markdown } from "@/component/common/markdown";
import { getBlogPostBySlug } from "@/data/server/blog-post";
import { upsertBreadcrumb } from "@/data/server/breadcrumb";
import { getProfile } from "@/data/server/profile";
import { PageProps } from "@/model/next";
import { Paper, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { notFound } from "next/navigation";

// TODO: Autor hinzufügen
/**
 * Zeigt einen Blog-Beitrag an.
 */
const BlogPostPage = async ({ params }: PageProps<{ slug: string }>) => {
    const { slug } = params;

    const blogPost = await getBlogPostBySlug(slug);

    if (!blogPost) {
        return notFound();
    }

    await upsertBreadcrumb({ path: `/blog/${slug}`, title: blogPost.title });

    const author = await getProfile(blogPost.authorId);

    return (
        <Stack gap={4}>
            <Stack gap={1}>
                <Typography variant={"h1"}>{blogPost.title}</Typography>

                <Typography variant={"body2"} fontWeight={600}>
                    {author ? author.sub : "Unbekannter Autor"}, {dayjs(blogPost.createdAt).format("DD. MMMM YYYY")}
                </Typography>
            </Stack>

            <Typography>{blogPost.description}</Typography>

            <Paper sx={{ p: 2 }}>
                <Markdown>{blogPost.content}</Markdown>
            </Paper>
        </Stack>
    );
};

export default BlogPostPage;
