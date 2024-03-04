import "server-only";

import { BlogPostCard } from "@/component/blog/blog-post-card";
import { CardGrid } from "@/component/common/card-grid";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import Database from "@synbase/database";

const AdminBlogPage = async () => {
    const blogPosts = await Database.blogPost.findMany();

    return (
        <Stack spacing={2}>
            <Typography variant={"h1"}>Blog-Beiträge</Typography>

            <Box>
                <Button
                    href={"/admin/blog/new"}
                    variant={"contained"}
                    color={"primary"}
                    size={"large"}
                    startIcon={<Add />}
                >
                    Verfassen
                </Button>
            </Box>

            <CardGrid>
                {blogPosts.map((blogPost) => (
                    <BlogPostCard
                        key={`blog-post-${blogPost.id}`}
                        value={blogPost}
                        actions={
                            <>
                                <Tooltip title={"In neuem Tab öffnen"}>
                                    <IconButton href={`/blog/${blogPost.slug}`} target={"_blank"}>
                                        <Visibility />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title={"Bearbeiten"}>
                                    <IconButton>
                                        <Edit />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title={"Löschen"}>
                                    <IconButton>
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            </>
                        }
                    />
                ))}
            </CardGrid>
        </Stack>
    );
};

export default AdminBlogPage;
