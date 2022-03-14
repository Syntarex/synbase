import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { IProfile } from "@synbase/shared";
import _ from "lodash";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { getSynbase } from "../../client/server.client";
import { Fetch } from "../../component/common/fetch/fetch.component";
import ProfileAvatar from "../../component/profile/profile-avatar.component";
import { Urls } from "../../constants/constants.client";
import { getProfileBySlug } from "../../data/profile/profile.queries";
import { useSynbase } from "../../hook/client/use-synbase.hook";
import { useBreadcrumb } from "../../hook/layout/use-breadcrumb.hook";
import { useRedirect } from "../../hook/use-redirect.hook";
import { IWithDehydratedState } from "../../model/page-props.model";
import { IUrl } from "../../model/url.model";

const ProfilePage = () => {
    const [profileUrl, setProfileUrl] = React.useState<IUrl | undefined>(undefined);

    useBreadcrumb([Urls.Profile, profileUrl]);

    const router = useRouter();
    const { slug } = router.query;

    const redirect = useRedirect();

    const onProfileLoaded = React.useCallback(
        (profile: IProfile | null) => {
            if (_.isNull(profile)) {
                redirect(Urls.NotFound);
                return;
            }

            setProfileUrl({
                path: `${Urls.Profile}/${profile.slug}`,
                title: profile.nickname,
            });
        },
        [redirect],
    );

    React.useEffect(() => {
        if (_.isUndefined(slug) || _.isArray(slug)) {
            redirect(Urls.NotFound);
        }
    }, [slug, redirect]);

    if (_.isUndefined(slug) || _.isArray(slug)) {
        return <CircularProgress />;
    }

    const synbase = useSynbase();

    const profileQuery = React.useMemo(() => getProfileBySlug(synbase, slug), [synbase, slug]);

    return (
        <Stack>
            <Fetch
                selector={profileQuery}
                onSuccess={onProfileLoaded}
                renderOnSuccess={(profile) =>
                    _.isNull(profile) ? (
                        <CircularProgress />
                    ) : (
                        <Stack>
                            <Typography variant={"h1"}>{profile.nickname}</Typography>

                            <ProfileAvatar
                                sx={{
                                    width: 300,
                                    height: 300,
                                }}
                                src={
                                    _.isNull(profile.imageId) ? undefined : synbase.images.getImageUrl(profile.imageId)
                                }
                                profile={profile}
                            />
                        </Stack>
                    )
                }
            />
        </Stack>
    );
};

export const getServerSideProps: GetServerSideProps<IWithDehydratedState> = async (ctx) => {
    const synbase = await getSynbase(ctx);
    const queryClient = new QueryClient();

    const { slug } = ctx.query;

    if (!_.isUndefined(slug) && !_.isArray(slug)) {
        await queryClient.prefetchQuery(getProfileBySlug(synbase, slug));
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default ProfilePage;
