import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ApiResource, ICreateProfile } from "@synbase/shared";
import _ from "lodash";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Fetch } from "../../component/common/fetch/fetch.component";
import RegisterForm from "../../component/profile/register-form/register-form.component";
import { Urls } from "../../constants/constants.client";
import { getMyProfile } from "../../data/profile/profile.queries";
import { useSynbase } from "../../hook/client/use-synbase.hook";
import { useBreadcrumb } from "../../hook/layout/use-breadcrumb.hook";
import { useRedirect } from "../../hook/use-redirect.hook";

const RegisterPage = () => {
    useBreadcrumb([Urls.Profiles, Urls.Register]);

    const redirect = useRedirect();

    const synbase = useSynbase();
    const queryClient = useQueryClient();

    const { mutate: createProfile, isLoading } = useMutation(
        async (body: ICreateProfile) => synbase.profiles.createMy(body),
        {
            onSuccess: (profile) => {
                queryClient.invalidateQueries([ApiResource.Profile, profile.id]);
                queryClient.invalidateQueries([ApiResource.Profile, "my"]);
                redirect(Urls.ProfileMy);
            },
        },
    );

    const profileQuery = React.useMemo(() => getMyProfile(synbase), [synbase]);

    return (
        <Fetch
            selector={profileQuery}
            onSuccess={(profile) => (!_.isNull(profile) ? redirect(Urls.ProfileMy) : undefined)}
            renderOnSuccess={(profile) =>
                !_.isNull(profile) ? null : (
                    <Stack spacing={2}>
                        <Typography variant={"h3"}>Profil erstellen</Typography>
                        <Typography>Jeder sollte ein Profil haben. Du kanst später alles ändern.</Typography>

                        <RegisterForm disabled={isLoading} onSubmit={createProfile} />
                    </Stack>
                )
            }
        />
    );
};

export default RegisterPage;
