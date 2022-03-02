import Button from "@mui/material/Button";
import _ from "lodash";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

interface IAuthButtonProps {
    className?: string;
}

export const AuthButton = (props: IAuthButtonProps) => {
    const { className } = props;

    const { data: session } = useSession();

    const onButtonPressed = React.useCallback(() => {
        if (_.isNull(session)) {
            signIn("keycloak");
            return;
        }

        signOut();
    }, [session]);

    return (
        <Button className={className} variant={"contained"} onClick={onButtonPressed}>
            {!_.isNull(session) ? "Logout" : "Login"}
        </Button>
    );
};
