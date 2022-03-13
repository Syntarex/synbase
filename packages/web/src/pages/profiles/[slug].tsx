import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ApiResource, IGetImage } from "@synbase/shared";
import _ from "lodash";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { getClient } from "../../client/server.client";
import { Fetch } from "../../component/common/fetch/fetch.component";
import ProfileAvatar from "../../component/profile/profile-avatar.component";
import { Urls } from "../../constants/constants.client";
import { useSynbase } from "../../hook/client/use-synbase.hook";
import { useBreadcrumb } from "../../hook/layout/use-breadcrumb.hook";
import { useRedirect } from "../../hook/use-redirect.hook";
import { IWithDehydratedState } from "../../model/page-props.model";

const imageParams: IGetImage = {
    height: 300,
    width: 300,
};

const ProfilePage = () => {
    /* TODO: erweitere Breadcrumb um Profilname */
    useBreadcrumb([Urls.Profile]);

    const router = useRouter();
    const { slug } = router.query;

    const redirect = useRedirect();

    React.useEffect(() => {
        if (_.isUndefined(slug) || _.isArray(slug)) {
            redirect(Urls.NotFound);
        }
    }, [slug, redirect]);

    if (_.isUndefined(slug) || _.isArray(slug)) {
        return <CircularProgress />;
    }

    const synbase = useSynbase();

    return (
        <Stack>
            <Fetch
                selector={{
                    queryKey: [ApiResource.Profile, slug],
                    queryFn: () => synbase.profiles.getBySlug(slug),
                }}
                onSuccess={(profile) => (_.isNull(profile) ? redirect(Urls.NotFound) : undefined)}
                renderOnSuccess={(profile) =>
                    _.isNull(profile) ? (
                        <CircularProgress />
                    ) : (
                        <Stack>
                            <Typography variant={"h1"}>{profile.nickname}</Typography>

                            <Fetch
                                selector={{
                                    queryKey: [ApiResource.Profile, slug, "image"],
                                    queryFn: () => synbase.profiles.getImage(profile.id, imageParams),
                                }}
                                renderOnSuccess={(imageSrc) => (
                                    <ProfileAvatar
                                        sx={{
                                            width: 300,
                                            height: 300,
                                        }}
                                        src={imageSrc}
                                        profile={profile}
                                    />
                                )}
                            />
                        </Stack>
                    )
                }
            />
        </Stack>
    );
};

export const getServerSideProps: GetServerSideProps<IWithDehydratedState> = async (ctx) => {
    const client = await getClient(ctx);
    const queryClient = new QueryClient();

    const { slug } = ctx.query;

    if (!_.isUndefined(slug) && !_.isArray(slug)) {
        await queryClient.prefetchQuery([ApiResource.Profile, slug], () => client.profiles.getBySlug(slug));
        await queryClient.prefetchQuery([ApiResource.Profile, slug, "image"], () =>
            client.profiles.getMyImage(imageParams),
        );
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default ProfilePage;
