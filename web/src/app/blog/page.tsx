import "server-only";

import { BlogPostCard } from "@/component/blog/blog-post-card";
import { CardGrid } from "@/component/layout/card-grid";
import { getBlogPosts } from "@/data/server/blog-post";
import { setBreadcrumb } from "@/data/server/breadcrumb";
import { GetBlogPosts } from "@/model/blog-post";
import { PageProps } from "@/model/next";
import { Button, CardActions, Typography } from "@mui/material";
import { isEmpty } from "lodash";

/**
 * Zeigt einen Blog-Beitrag an.
 */
const BlogPage = async ({ searchParams }: PageProps<unknown, GetBlogPosts>) => {
    await setBreadcrumb({
        path: "/blog",
        title: "Blog",
    });

    const blogPosts = await getBlogPosts(searchParams);

    if (isEmpty(blogPosts)) {
        return <Typography>Hier entsteht etwas tolles. 🫶</Typography>;
    }

    return (
        <CardGrid>
            {blogPosts.map((blogPost) => (
                <BlogPostCard
                    key={`blog-post-${blogPost.id}`}
                    value={blogPost}
                    slots={{
                        cardActions: (
                            <CardActions>
                                <Button href={`/blog/${blogPost.slug}`}>Lesen</Button>
                            </CardActions>
                        ),
                    }}
                    cardProps={{ sx: { height: "100%" } }}
                />
            ))}
        </CardGrid>
    );
};

export default BlogPage;
