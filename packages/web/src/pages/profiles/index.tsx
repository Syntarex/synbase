import Stack from "@mui/material/Stack";
import { ApiResource, IGetImage } from "@synbase/shared";
import _ from "lodash";
import { GetServerSideProps } from "next";
import React from "react";
import { dehydrate, QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { getClient } from "../../client/server.client";
import { AuthRequired } from "../../component/auth/auth-required/auth-required.component";
import { Fetch } from "../../component/common/fetch/fetch.component";
import { ProfileAvatar } from "../../component/profile/profile-avatar.component";
import { Urls } from "../../constants/constants.client";
import { getMyProfile } from "../../data/profile/profile.selectors";
import { useSynbase } from "../../hook/client/use-synbase.hook";
import { useBreadcrumb } from "../../hook/layout/use-breadcrumb.hook";
import { IWithDehydratedState } from "../../model/page-props.model";

const imageParams: IGetImage = {
    height: 200,
    width: 200,
};

const MyProfilePage = () => {
    useBreadcrumb([Urls.Profile]);

    const synbase = useSynbase();
    const queryClient = useQueryClient();

    const {
        isLoading: profileIsLoading,
        isError: profileHasError,
        data: profile,
    } = useQuery([ApiResource.Profile, "my"], synbase.profiles.getMy);

    const {
        isLoading: imageIsLoading,
        isError: imageHasError,
        data: imageSrc,
    } = useQuery([ApiResource.Profile, "my", "image"], () => synbase.profiles.getMyImage(imageParams));

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

    return (
        <AuthRequired>
            <Fetch selector={getMyProfile}>
                {(profile) =>
                    _.isNull(profile) ? null : (
                        <Stack>
                            <ProfileAvatar
                                sx={{
                                    width: 300,
                                    height: 300,
                                }}
                                editMode={true}
                                onChange={changeImage}
                            />
                        </Stack>
                    )
                }
            </Fetch>
        </AuthRequired>
    );
};

export const getServerSideProps: GetServerSideProps<IWithDehydratedState> = async (ctx) => {
    const client = await getClient(ctx);
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery([ApiResource.Profile, "my"], client.profiles.getMy);
    await queryClient.prefetchQuery([ApiResource.Profile, "my", "image"], () =>
        client.profiles.getMyImage(imageParams),
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default MyProfilePage;
