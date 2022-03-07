import { IProfile } from "@synbase/shared";
import _ from "lodash";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { Urls } from "../../../constants/constants.client";
import { getMyProfile } from "../../../data/profile/profile.selectors";
import { useAuth } from "../../../hook/use-auth.hook";
import { Fetch } from "../../common/fetch.component";

interface IAuthRequiredProps {
    children: React.ReactNode;
}

export const AuthRequired = (props: IAuthRequiredProps) => {
    const { children } = props;

    const session = useAuth();
    const router = useRouter();

    const onProfileLoaded = React.useCallback(
        (profile: IProfile | null) => {
            if (!_.isNull(profile)) {
                return;
            }

            const { pathname } = router;

            if (pathname.startsWith(Urls.ProfileRegister.path)) {
                return;
            }

            router.push(Urls.ProfileRegister.path);
        },
        [router],
    );

    React.useEffect(() => {
        console.log(router.pathname);
    }, [router]);

    React.useEffect(() => {
        if (_.isNull(session)) {
            signIn("keycloak");
        }
    }, [session]);

    if (_.isNull(session)) {
        return null;
    }

    return (
        <Fetch selector={getMyProfile} onLoaded={onProfileLoaded}>
            {(profile) => (_.isNull(profile) ? null : <>{children}</>)}
        </Fetch>
    );
};
