import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { IProfile } from "@synbase/shared";
import _ from "lodash";
import { GetServerSideProps } from "next";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { getSynbase } from "../../client/server.client";
import { Fetch } from "../../component/common/fetch/fetch.component";
import ProfileItem from "../../component/profile/profile-item/profile-item.component";
import { Urls } from "../../constants/constants.client";
import { getProfileBySlug } from "../../data/profile/profile.queries";
import { useAuth } from "../../hook/auth/use-auth.hook";
import { useSynbase } from "../../hook/client/use-synbase.hook";
import { useBreadcrumb } from "../../hook/layout/use-breadcrumb.hook";
import { useRedirect } from "../../hook/use-redirect.hook";
import { IWithDehydratedState } from "../../model/page-props.model";
import { IUrl } from "../../model/url.model";

interface IProfilePageProps extends IWithDehydratedState {
    slug: string;
}

const ProfilePage = (props: IProfilePageProps) => {
    const { slug } = props;

    const redirect = useRedirect();

    const { profile } = useAuth({ redirectEnabled: false });

    React.useEffect(() => {
        if (!_.isNull(profile) && _.isEqual(profile.slug, slug)) {
            redirect(Urls.MyProfile);
        }
    }, [slug, profile]);

    const [profileUrl, setProfileUrl] = React.useState<IUrl | undefined>(undefined);

    useBreadcrumb([Urls.Profiles, profileUrl]);

    const onProfileLoaded = React.useCallback(
        (profile: IProfile | null) => {
            if (_.isNull(profile)) {
                redirect(Urls.NotFound);
                return;
            }

            setProfileUrl(Urls.Profile(profile));
        },
        [redirect],
    );

    const synbase = useSynbase();

    const profileQuery = React.useMemo(() => getProfileBySlug(synbase, slug), [synbase, slug]);

    return (
        <Stack spacing={8}>
            <Fetch
                selector={profileQuery}
                onSuccess={onProfileLoaded}
                renderOnSuccess={(profile) =>
                    _.isNull(profile) ? (
                        <CircularProgress />
                    ) : (
                        <Stack spacing={2}>
                            <Typography variant={"h3"}>Profil von {profile.nickname}</Typography>

                            <ProfileItem profile={profile} />
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

    if (_.isUndefined(slug) || _.isArray(slug)) {
        ctx.res.setHeader("location", Urls.NotFound.path);
        ctx.res.statusCode = 302;
        ctx.res.end();
    } else {
        await queryClient.prefetchQuery(getProfileBySlug(synbase, slug));
    }

    return {
        props: {
            slug,
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default ProfilePage;
