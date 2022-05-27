import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import Button from "@mui/material/Button";
import _ from "lodash";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { signOut } from "../../../util/sign-out.util";

interface IAuthButtonProps {
    sx?: SxProps<Theme>;
}

export const AuthButton = (props: IAuthButtonProps) => {
    const { sx } = props;

    const { data: session } = useSession();

    const onButtonPressed = React.useCallback(() => {
        if (_.isNull(session)) {
            signIn("keycloak");
            return;
        }

        signOut();
    }, [session]);

    return (
        <Button sx={sx} variant={"contained"} onClick={onButtonPressed}>
            {!_.isNull(session) ? "Logout" : "Login"}
        </Button>
    );
};
