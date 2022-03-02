import _ from "lodash";
import { signIn } from "next-auth/react";
import React from "react";
import { useAuth } from "../../../hook/use-auth.hook";

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

    if (_.isNull(session)) {
        return null;
    }

    return <>{children}</>;
};
