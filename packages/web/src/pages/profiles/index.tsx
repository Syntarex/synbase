import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ApiResource, ICreatePoints, PointsSource } from "@synbase/shared";
import _ from "lodash";
import { GetServerSideProps } from "next";
import React from "react";
import { dehydrate, QueryClient, useMutation, useQueryClient } from "react-query";
import { getSynbase } from "../../client/server.client";
import { Fetch } from "../../component/common/fetch/fetch.component";
import PointsItem from "../../component/points/points-item/points-item.component";
import ProfileAvatar from "../../component/profile/profile-avatar/profile-avatar.component";
import { Urls } from "../../constants/constants.client";
import { getAllMyPoints } from "../../data/points/points.queries";
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
            /* TODO: Bild wird nicht über query abgefragt, finde also einen anderen Weg dieses zu aktualisieren */
            onSuccess: () => queryClient.invalidateQueries([ApiResource.Profile, "my", "image"]),
        },
    );

    const { mutate: createPoints } = useMutation((body: ICreatePoints) => synbase.points.create(body), {
        onSuccess: () => queryClient.invalidateQueries([ApiResource.Points]),
    });

    const pointsQuery = React.useMemo(() => getAllMyPoints(synbase, {}), []);

    if (_.isNull(profile)) {
        return <CircularProgress />;
    }

    const { imageId, id } = profile;

    return (
        <Stack spacing={4}>
            <Stack spacing={2}>
                <Typography variant={"h3"}>Dein Profil</Typography>

                <ProfileAvatar
                    editMode
                    src={_.isNull(imageId) ? undefined : synbase.images.getImageUrl(imageId)}
                    profile={profile}
                    onChange={changeImage}
                />
            </Stack>

            <Stack spacing={2}>
                <Typography variant={"h3"}>Punkte</Typography>
                <Typography>Eine Liste aller Punkte die du bereits verdient oder ausgegeben hast.</Typography>

                <Fetch
                    selector={pointsQuery}
                    renderOnSuccess={(points) =>
                        _.isEmpty(points) ? (
                            <Typography>Du hast bisher keine Punkte.</Typography>
                        ) : (
                            <Stack spacing={2}>
                                {points.map((each) => (
                                    <PointsItem key={`points-${each.id}`} points={each} />
                                ))}
                            </Stack>
                        )
                    }
                />

                <Button
                    variant={"contained"}
                    onClick={() =>
                        createPoints({
                            amount: 500,
                            profileId: id,
                            source: PointsSource.ADMIN_ACTION,
                            notes: "Ich habe dir die Punkte gutgeschrieben, einfach weil ich dich gern habe. Ich hoffe es geht dir gut.",
                        })
                    }
                >
                    Punkte hinzufügen
                </Button>
            </Stack>
        </Stack>
    );
};

export const getServerSideProps: GetServerSideProps<IWithDehydratedState> = async (ctx) => {
    const synbase = await getSynbase(ctx);
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(getMyProfile(synbase));
    await queryClient.prefetchQuery(getAllMyPoints(synbase, {}));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default MyProfilePage;
