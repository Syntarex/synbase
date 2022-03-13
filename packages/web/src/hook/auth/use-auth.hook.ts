import { ApiResource } from "@synbase/shared";
import _ from "lodash";
import { signIn } from "next-auth/react";
import React from "react";
import { useQuery } from "react-query";
import { Urls } from "../../constants/constants.client";
import { IAuth } from "../../model/auth/auth.model";
import { useSynbase } from "../client/use-synbase.hook";
import { useRedirect } from "../use-redirect.hook";
import { useSession } from "./use-session.hook";

export const useAuth = (): IAuth => {
    const session = useSession();

    React.useEffect(() => {
        if (_.isNull(session)) {
            signIn("keycloak");
        }
    }, [session]);

    const redirect = useRedirect();

    const synbase = useSynbase();

    const { data: profile } = useQuery({
        queryKey: [ApiResource.Profile, "my"],
        queryFn: () => synbase.profiles.getMy(),
        enabled: synbase.isLoggedIn(),
    });

    React.useEffect(() => {
        if (_.isNull(profile)) {
            redirect(Urls.ProfileRegister);
        }
    }, [profile]);

    return {
        profile: _.isUndefined(profile) ? null : profile,
        session,
    };
};
