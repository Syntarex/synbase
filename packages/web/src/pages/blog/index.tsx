import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import { GetStaticProps } from "next";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { getSynbase } from "../../client/server.client";
import BlogItemCard from "../../component/blog-item/blog-item-card/blog-item-card.component";
import { Fetch } from "../../component/common/fetch/fetch.component";
import { Urls } from "../../constants/constants.client";
import { getAllBlogItems } from "../../data/blog-item/blog-item.queries";
import { useSynbase } from "../../hook/client/use-synbase.hook";
import { useBreadcrumb } from "../../hook/layout/use-breadcrumb.hook";
import { IWithDehydratedState } from "../../model/page-props.model";

const BlogPage = () => {
    useBreadcrumb([Urls.Blog]);

    const synbase = useSynbase();

    const blogItemsQuery = React.useMemo(() => getAllBlogItems(synbase), []);

    return (
        <Stack spacing={2}>
            <Typography variant={"h3"}>Blog</Typography>

            <Fetch
                selector={blogItemsQuery}
                renderOnSuccess={(blogItems) =>
                    _.isEmpty(blogItems) ? (
                        <Typography>Keine Blog-Beiträge gefunden</Typography>
                    ) : (
                        <>
                            {blogItems.map((blogItem) => (
                                <BlogItemCard key={`blog-item-${blogItem.id}`} blogItem={blogItem} />
                            ))}
                        </>
                    )
                }
            />
        </Stack>
    );
};

export const getStaticProps: GetStaticProps<IWithDehydratedState> = async () => {
    const synbase = await getSynbase();
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(getAllBlogItems(synbase, {}));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default BlogPage;
