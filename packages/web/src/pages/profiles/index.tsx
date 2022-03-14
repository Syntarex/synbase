import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ApiResource } from "@synbase/shared";
import _ from "lodash";
import { GetServerSideProps } from "next";
import React from "react";
import { dehydrate, QueryClient, useMutation, useQueryClient } from "react-query";
import { getSynbase } from "../../client/server.client";
import ProfileAvatar from "../../component/profile/profile-avatar.component";
import { Urls } from "../../constants/constants.client";
import { getMyProfile } from "../../data/profile/profile.queries";
import { useAuth } from "../../hook/auth/use-auth.hook";
import { useSynbase } from "../../hook/client/use-synbase.hook";
import { useBreadcrumb } from "../../hook/layout/use-breadcrumb.hook";
import { IWithDehydratedState } from "../../model/page-props.model";

const MyProfilePage = () => {
    useBreadcrumb([Urls.Profile]);

    const synbase = useSynbase();
    const queryClient = useQueryClient();

    const { profile } = useAuth();

    const { mutate: changeImage } = useMutation(
        async (file: File | null) => {
            if (_.isNull(file)) {
                /* TODO: Bild Löschen Schnittstelle! */
                return;
            }

            return synbase.profiles.uploadMyImage(file);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ApiResource.Profile, "my", "image"]);
            },
        },
    );

    if (_.isNull(profile)) {
        return <CircularProgress />;
    }

    const { imageId } = profile;

    return (
        <Stack>
            <Typography variant={"h1"}>{profile.nickname}</Typography>

            <ProfileAvatar
                editMode
                sx={{
                    width: 300,
                    height: 300,
                }}
                src={_.isNull(imageId) ? undefined : synbase.images.getImageUrl(imageId)}
                profile={profile}
                onChange={changeImage}
            />
        </Stack>
    );
};

export const getServerSideProps: GetServerSideProps<IWithDehydratedState> = async (ctx) => {
    const synbase = await getSynbase(ctx);
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(getMyProfile(synbase));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default MyProfilePage;
