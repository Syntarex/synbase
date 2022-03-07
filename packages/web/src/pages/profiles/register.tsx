import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { IProfile } from "@synbase/shared";
import _ from "lodash";
import { useRouter } from "next/router";
import React from "react";
import { AuthRequired } from "../../component/auth/auth-required/auth-required.component";
import { Fetch } from "../../component/common/fetch.component";
import { Urls } from "../../constants/constants.client";
import { getMyProfile } from "../../data/profile/profile.selectors";
import { useBreadcrumb } from "../../hook/use-breadcrumb.hook";

const RegisterPage = () => {
    useBreadcrumb([Urls.Profile, Urls.ProfileRegister]);

    const router = useRouter();

    const onProfileLoaded = React.useCallback(
        (profile: IProfile | null) => (_.isNull(profile) ? undefined : router.push(Urls.Home.path)),
        [router],
    );

    return (
        <AuthRequired>
            <Fetch selector={getMyProfile} onLoaded={onProfileLoaded}>
                {(profile) =>
                    !_.isNull(profile) ? null : (
                        <Stack>
                            <Typography variant={"h1"}>Registrieren!</Typography>
                        </Stack>
                    )
                }
            </Fetch>
        </AuthRequired>
    );
};

export default RegisterPage;
