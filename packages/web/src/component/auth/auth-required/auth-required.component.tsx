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

    const isRegisterPage = React.useMemo(() => router.pathname.startsWith(Urls.ProfileRegister.path), [router]);

    const onProfileLoaded = React.useCallback(
        (profile: IProfile | null) => {
            if (_.isNull(profile) && !isRegisterPage) {
                router.push(Urls.ProfileRegister.path);
            }
        },
        [router, isRegisterPage],
    );

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
            {(profile) => (_.isNull(profile) && !isRegisterPage ? null : <>{children}</>)}
        </Fetch>
    );
};
