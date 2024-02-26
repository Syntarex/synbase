import "server-only";

import { BlogPostCard } from "@/component/blog/blog-post-card";
import { Stack, Typography } from "@mui/material";
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
        <Stack direction={"row"} flexWrap={"wrap"} gap={4}>
            {blogPosts.map((blogPost) => (
                <BlogPostCard
                    key={blogPost.id}
                    sx={{ width: { xs: "100%", md: 360 }, alignSelf: "stretch" }}
                    value={blogPost}
                />
            ))}
        </Stack>
    );
};

export default Blog;
