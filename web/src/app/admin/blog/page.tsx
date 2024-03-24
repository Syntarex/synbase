import "server-only";

import { BlogPostCard } from "@/component/blog/blog-post-card";
import { FabButton } from "@/component/common/fab-button";
import { CardGrid } from "@/component/layout/card-grid";
import { getBlogPosts } from "@/data/server/blog-post";
import { GetBlogPosts } from "@/model/blog-post";
import { PageProps } from "@/model/next";
import { Add, Edit, Visibility } from "@mui/icons-material";
import { CardActions, IconButton, Stack, Typography } from "@mui/material";
import { AppConfigDynamic } from "next/dist/build/utils";

export const dynamic: AppConfigDynamic = "force-dynamic";

const AdminBlogPage = async ({ searchParams }: PageProps<unknown, GetBlogPosts>) => {
    const blogPosts = await getBlogPosts(searchParams);

    return (
        <Stack gap={2}>
            <Typography variant={"h1"}>Blog-Beiträge</Typography>

            <CardGrid>
                {blogPosts.map((blogPost) => (
                    <BlogPostCard
                        key={`blog-post-${blogPost.id}`}
                        value={blogPost}
                        slots={{
                            cardActions: (
                                <CardActions>
                                    <IconButton href={`/blog/${blogPost.slug}`} target={"_blank"}>
                                        <Visibility />
                                    </IconButton>

                                    <IconButton href={`/admin/blog/${blogPost.id}`}>
                                        <Edit />
                                    </IconButton>
                                </CardActions>
                            ),
                        }}
                        cardProps={{
                            sx: { height: "100%" },
                        }}
                    />
                ))}
            </CardGrid>

            <FabButton href={"/admin/blog/create"}>
                <Add />
            </FabButton>
        </Stack>
    );
};

export default AdminBlogPage;
