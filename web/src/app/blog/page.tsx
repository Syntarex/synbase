import "server-only";

import { BlogPostCard } from "@/component/blog/blog-post-card";
import { CardGrid } from "@/component/common/card-grid";
import { Typography } from "@mui/material";
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
        <CardGrid>
            {blogPosts.map((blogPost) => (
                <BlogPostCard sx={{ height: "100%" }} value={blogPost} />
            ))}
        </CardGrid>
    );
};

export default Blog;
