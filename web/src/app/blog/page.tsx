import "server-only";

import { BlogPostCard } from "@/component/blog/blog-post-card";
import { Grid, Typography } from "@mui/material";
import Database from "@synbase/database";
import { isEmpty } from "lodash";

/**
 * Zeigt einen Blog-Beitrag an.
 */
const Blog = async () => {
    const blogPosts = await Database.blogPost.findMany();

    if (isEmpty(blogPosts)) {
        return <Typography>Hier entsteht etwas tolles. 🫶</Typography>;
    }

    return (
        <Grid container spacing={4}>
            {blogPosts.map((blogPost) => (
                <Grid item key={blogPost.id} xs={12} sm={12} md={4} xl={4}>
                    <BlogPostCard sx={{ height: "100%" }} value={blogPost} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Blog;
