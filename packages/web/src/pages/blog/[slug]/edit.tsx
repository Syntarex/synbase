import CircularProgress from "@mui/material/CircularProgress";
import { ApiResource, IBlogItem, IUpdateBlogItem } from "@synbase/shared";
import _ from "lodash";
import { GetServerSideProps } from "next";
import React from "react";
import { dehydrate, QueryClient, useMutation, useQueryClient } from "react-query";
import { getSynbase } from "../../../client/server.client";
import BlogItemEditor from "../../../component/blog-item/blog-item-editor/blog-item-editor.component";
import { Fetch } from "../../../component/common/fetch/fetch.component";
import { Urls } from "../../../constants/constants.client";
import { getBlogItemBySlug } from "../../../data/blog-item/blog-item.queries";
import { useSynbase } from "../../../hook/client/use-synbase.hook";
import { useBreadcrumb } from "../../../hook/layout/use-breadcrumb.hook";
import { useRedirect } from "../../../hook/use-redirect.hook";
import { IWithDehydratedState } from "../../../model/page-props.model";
import { IUrl } from "../../../model/url.model";

interface IEditBlogItemPageProps extends IWithDehydratedState {
    slug: string;
}

const BlockItemPage = (props: IEditBlogItemPageProps) => {
    const { slug } = props;

    const redirect = useRedirect();

    const [blogItemUrl, setBlogItemUrl] = React.useState<IUrl | undefined>(undefined);

    useBreadcrumb([Urls.Blog, blogItemUrl]);

    const onBlogItemLoaded = React.useCallback(
        (blogItem: IBlogItem | null) => {
            if (_.isNull(blogItem)) {
                redirect(Urls.NotFound);
                return;
            }

            setBlogItemUrl(Urls.EditBlogItem(blogItem));
        },
        [redirect],
    );

    const synbase = useSynbase();

    const blogItemQuery = React.useMemo(() => getBlogItemBySlug(synbase, slug), [synbase, slug]);

    const queryClient = useQueryClient();

    const { mutate: updateBlogItem, isLoading } = useMutation(
        (data: [string, IUpdateBlogItem]) => synbase.blogItems.update(data[0], data[1]),
        {
            onSuccess: (blogItem) => queryClient.invalidateQueries([ApiResource.BlogItem, blogItem?.id]),
        },
    );

    const onBlogItemChanged = React.useCallback(
        (id: string, body: IUpdateBlogItem) => {
            if (isLoading) {
                return;
            }

            updateBlogItem([id, body]);
        },
        [isLoading],
    );

    return (
        <Fetch
            selector={blogItemQuery}
            onSuccess={onBlogItemLoaded}
            renderOnSuccess={(blogItem) =>
                _.isNull(blogItem) ? (
                    <CircularProgress />
                ) : (
                    <BlogItemEditor value={blogItem} onChange={onBlogItemChanged} />
                )
            }
        />
    );
};

export const getServerSideProps: GetServerSideProps<IWithDehydratedState> = async (ctx) => {
    const synbase = await getSynbase(ctx);
    const queryClient = new QueryClient();

    const { slug } = ctx.query;

    if (_.isUndefined(slug) || _.isArray(slug)) {
        ctx.res.setHeader("location", Urls.NotFound.path);
        ctx.res.statusCode = 302;
        ctx.res.end();
    } else {
        await queryClient.prefetchQuery(getBlogItemBySlug(synbase, slug));
    }

    return {
        props: {
            slug,
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default BlockItemPage;
