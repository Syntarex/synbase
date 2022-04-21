import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { IBlogItem } from "@synbase/shared";
import _ from "lodash";
import { GetServerSideProps } from "next";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { getSynbase } from "../../../client/server.client";
import { Fetch } from "../../../component/common/fetch/fetch.component";
import MarkdownViewer from "../../../component/common/markdown-viewer/markdown-viewer.component";
import ProfileItem from "../../../component/profile/profile-item/profile-item.component";
import { Urls } from "../../../constants/constants.client";
import { getBlogItemBySlug } from "../../../data/blog-item/blog-item.queries";
import { getProfile } from "../../../data/profile/profile.queries";
import { useSynbase } from "../../../hook/client/use-synbase.hook";
import { useBreadcrumb } from "../../../hook/layout/use-breadcrumb.hook";
import { useRedirect } from "../../../hook/use-redirect.hook";
import { IWithDehydratedState } from "../../../model/page-props.model";
import { IUrl } from "../../../model/url.model";

interface IBlogItemPageProps extends IWithDehydratedState {
    slug: string;
}

const BlockItemPage = (props: IBlogItemPageProps) => {
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

            setBlogItemUrl(Urls.BlogItem(blogItem));
        },
        [redirect],
    );

    const synbase = useSynbase();

    const blogItemQuery = React.useMemo(() => getBlogItemBySlug(synbase, slug), [synbase, slug]);
    const profileQuery = React.useCallback((id: string) => getProfile(synbase, id), [synbase]);

    return (
        <Fetch
            selector={blogItemQuery}
            onSuccess={onBlogItemLoaded}
            renderOnSuccess={(blogItem) =>
                _.isNull(blogItem) ? (
                    <CircularProgress />
                ) : (
                    <Stack spacing={2}>
                        <Typography variant={"h3"}>{blogItem.title}</Typography>

                        <MarkdownViewer>{blogItem.content}</MarkdownViewer>

                        <Fetch
                            selector={profileQuery(blogItem.authorId)}
                            renderOnSuccess={(profile) => !_.isNull(profile) && <ProfileItem profile={profile} />}
                        />
                    </Stack>
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
