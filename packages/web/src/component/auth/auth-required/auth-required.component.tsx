import _ from "lodash";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { Urls } from "../../../constants/constants.client";
import { useAuth } from "../../../hook/auth/use-auth.hook";
import { useSynbase } from "../../../hook/client/use-synbase.hook";

interface IAuthRequiredProps {
    children: React.ReactNode;
}

export const AuthRequired = (props: IAuthRequiredProps) => {
    const { children } = props;

    const session = useAuth();

    React.useEffect(() => {
        if (_.isNull(session)) {
            signIn("keycloak");
        }
    }, [session]);

    const router = useRouter();

    const isRegisterPage = React.useMemo(() => router.pathname.startsWith(Urls.ProfileRegister.path), [router]);

    const synbase = useSynbase();

    const { data: profile } = useQuery(["profile", "my"], synbase.profiles.getMy);

    React.useEffect(() => {
        if (_.isNull(profile) && !isRegisterPage) {
            router.push(Urls.ProfileRegister.path);
            return;
        }
    }, [profile, router, isRegisterPage]);

    if (_.isNull(session) || _.isUndefined(profile) || (_.isNull(profile) && !isRegisterPage)) {
        return null;
    }

    return <>{children}</>;
};
