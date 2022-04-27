import { ApiResource } from "@synbase/shared";
import dayjs from "dayjs";
import _ from "lodash";
import { signIn } from "next-auth/react";
import React from "react";
import { useQuery } from "react-query";
import { Urls } from "../../constants/constants.client";
import { IAuth } from "../../model/auth/auth.model";
import { useSynbase } from "../client/use-synbase.hook";
import { useRedirect } from "../use-redirect.hook";
import { useSession } from "./use-session.hook";

interface IUseAuthOptions {
    redirectEnabled: boolean;
}

export const useAuth = (options: IUseAuthOptions = { redirectEnabled: true }): IAuth => {
    const { redirectEnabled } = options;
    const session = useSession();

    const redirect = useRedirect();

    const synbase = useSynbase();

    const expired = React.useMemo(
        () => !_.isNull(session) && !_.isUndefined(session) && dayjs(session.expires).isBefore(dayjs()),
        [session],
    );

    React.useEffect(() => {
        if (redirectEnabled && expired) {
            redirect(Urls.AutoLogout);
        }
    }, [expired, redirectEnabled]);

    React.useEffect(() => {
        if (redirectEnabled && _.isNull(session)) {
            signIn("keycloak");
        }
    }, [session, redirectEnabled]);

    const { data: profile } = useQuery({
        queryKey: [ApiResource.Profile, "my"],
        queryFn: () => synbase.profiles.getMy(),
        enabled: synbase.isLoggedIn() && !expired,
    });

    React.useEffect(() => {
        if (redirectEnabled && _.isNull(profile)) {
            redirect(Urls.Register);
        }
    }, [profile, redirectEnabled]);

    return {
        profile: expired || _.isUndefined(profile) ? null : profile,
        session: expired || _.isUndefined(session) ? null : session,
    };
};
