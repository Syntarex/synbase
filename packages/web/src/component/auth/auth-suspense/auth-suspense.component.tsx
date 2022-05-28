import CircularProgress from "@mui/material/CircularProgress";
import _ from "lodash";
import React from "react";
import { useSession } from "../../../hook/auth/use-session.hook";

interface IAuthSuspenseProps {
    children: React.ReactNode;
}

const AuthSuspense = (props: IAuthSuspenseProps) => {
    const { children } = props;

    const session = useSession();

    if (_.isUndefined(session)) {
        return <CircularProgress />;
    }

    return <>{children}</>;
};

export default AuthSuspense;
