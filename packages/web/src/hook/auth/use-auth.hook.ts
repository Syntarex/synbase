import _ from "lodash";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { Urls } from "../../constants/constants.client";
import { IAuth } from "../../model/auth/auth.model";
import { useSynbase } from "../client/use-synbase.hook";
import { useSession } from "./use-session.hook";

export const useAuth = (): IAuth => {
    const session = useSession();

    React.useEffect(() => {
        if (_.isNull(session)) {
            signIn("keycloak");
        }
    }, [session]);

    if (_.isNull(session)) {
        return {
            session,
            profile: null,
        };
    }

    const router = useRouter();

    const isRegisterPage = React.useMemo(() => router.pathname.startsWith(Urls.ProfileRegister.path), [router]);

    const synbase = useSynbase();

    const { data: profile } = useQuery(["profile", "my"], synbase.profiles.getMy);

    React.useEffect(() => {
        if (_.isNull(profile) && !isRegisterPage) {
            router.push(Urls.ProfileRegister.path);
        }
    }, [profile, isRegisterPage]);

    if (_.isUndefined(profile) || _.isNull(profile)) {
        return {
            profile: null,
            session,
        };
    }

    return {
        profile,
        session,
    };
};
