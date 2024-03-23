import "server-only";

import { BlogPostCard } from "@/component/blog/blog-post-card";
import { CardGrid } from "@/component/common/card-grid";
import { Typography } from "@mui/material";
import Database from "@synbase/database";
import { isEmpty } from "lodash";

/**
 * Zeigt einen Blog-Beitrag an.
 */
const BlogPage = async () => {
    const blogPosts = await Database.blogPost.findMany();

    if (isEmpty(blogPosts)) {
        return <Typography>Hier entsteht etwas tolles. 🫶</Typography>;
    }

    return (
        <CardGrid>
            {blogPosts.map((blogPost) => (
                <BlogPostCard key={`blog-post-${blogPost.id}`} value={blogPost} />
            ))}
        </CardGrid>
    );
};

export default BlogPage;
