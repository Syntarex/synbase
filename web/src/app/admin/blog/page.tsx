import "server-only";

import { BlogPostCard } from "@/component/blog/blog-post-card";
import { CardGrid } from "@/component/common/card-grid";
import { FabButton } from "@/component/common/fab-button";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import { CardActions, IconButton, Stack, Typography } from "@mui/material";
import Database from "@synbase/database";

// TODO: Edit- und Delete-Button
const AdminBlogPage = async () => {
    const blogPosts = await Database.blogPost.findMany();

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

                                    <IconButton>
                                        <Edit />
                                    </IconButton>

                                    <IconButton>
                                        <Delete />
                                    </IconButton>
                                </CardActions>
                            ),
                        }}
                    />
                ))}
            </CardGrid>

            <FabButton href={"/admin/blog/new"}>
                <Add />
            </FabButton>
        </Stack>
    );
};

export default AdminBlogPage;
