import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ApiResource, IGetImage } from "@synbase/shared";
import _ from "lodash";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getClient } from "../../client/server.client";
import ProfileAvatar from "../../component/profile/profile-avatar.component";
import { Urls } from "../../constants/constants.client";
import { useSynbase } from "../../hook/client/use-synbase.hook";
import { useBreadcrumb } from "../../hook/layout/use-breadcrumb.hook";
import { IWithDehydratedState } from "../../model/page-props.model";

const imageParams: IGetImage = {
    height: 300,
    width: 300,
};

const ProfilePage = () => {
    useBreadcrumb([Urls.Profile]);

    const router = useRouter();

    const redirectTo404 = React.useCallback(() => {
        console.log("Redirect to 404");
        router.push("/404");
    }, [router]);

    const { slug } = router.query;

    React.useEffect(() => {
        if (_.isUndefined(slug) || _.isArray(slug)) {
            redirectTo404();
        }
    }, [slug, redirectTo404]);

    if (_.isUndefined(slug) || _.isArray(slug)) {
        return <CircularProgress />;
    }

    const synbase = useSynbase();

    const { data: profile } = useQuery([ApiResource.Profile, slug], () => synbase.profiles.getBySlug(slug));

    React.useEffect(() => {
        if (_.isNull(profile)) {
            redirectTo404();
        }
    }, [profile, redirectTo404]);

    if (_.isUndefined(profile) || _.isNull(profile)) {
        return <CircularProgress />;
    }

    const { data: imageSrc } = useQuery([ApiResource.Profile, slug, "image"], () =>
        synbase.profiles.getImage(profile.id, imageParams),
    );

    return (
        <Stack>
            <Typography variant={"h1"}>{profile.nickname}</Typography>

            <ProfileAvatar
                sx={{
                    width: 300,
                    height: 300,
                }}
                src={imageSrc}
                profile={profile}
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
