import _ from "lodash";
import React from "react";
import { useAuth } from "../../../hook/auth/use-auth.hook";

interface IAuthGuardProps {
    redirect?: boolean;
    children: React.ReactNode;
}

const AuthGuard = (props: IAuthGuardProps) => {
    const { redirect, children } = props;

    const { profile, session } = useAuth({ redirectEnabled: _.isUndefined(redirect) ? false : redirect });

    if (_.isNull(profile) || _.isNull(session)) {
        return null;
    }

    return <>{children}</>;
};

export default AuthGuard;
