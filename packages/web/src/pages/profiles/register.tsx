import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { IProfile } from "@synbase/shared";
import _ from "lodash";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { AuthRequired } from "../../component/auth/auth-required/auth-required.component";
import { Fetch } from "../../component/common/fetch/fetch.component";
import { Urls } from "../../constants/constants.client";
import { createMyProfile, getMyProfile } from "../../data/profile/profile.selectors";
import { useBreadcrumb } from "../../hook/use-breadcrumb.hook";

const RegisterPage = () => {
    useBreadcrumb([Urls.Profile, Urls.ProfileRegister]);

    const router = useRouter();

    const refreshProfile = useRecoilRefresher_UNSTABLE(getMyProfile);

    const [submit, setSubmit] = React.useState(false);

    const onProfileLoaded = React.useCallback(
        (profile: IProfile | null) => (_.isNull(profile) ? undefined : router.push(Urls.Profile.path)),
        [router],
    );

    const onProfileCreated = React.useCallback(() => {
        refreshProfile();
        router.push(Urls.Profile.path);
    }, [refreshProfile, router]);

    const onSubmit = React.useCallback(() => setSubmit(true), []);

    return (
        <>
            <AuthRequired>
                <Fetch selector={getMyProfile} onLoaded={onProfileLoaded}>
                    {(profile) =>
                        !_.isNull(profile) ? null : (
                            <Stack>
                                <Button onClick={onSubmit}>Registrieren</Button>
                            </Stack>
                        )
                    }
                </Fetch>

                {!submit ? null : (
                    <Fetch
                        selector={createMyProfile({
                            nickname: "Syntarex",
                            slug: "syntarex",
                        })}
                        onLoaded={onProfileCreated}
                    />
                )}
            </AuthRequired>
        </>
    );
};

export default RegisterPage;
