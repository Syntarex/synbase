import { useAuth0 } from "@auth0/auth0-react";
import { Button, SxProps, Theme } from "@mui/material";
import { useCallback } from "react";

interface IAuthButtonProps {
    sx?: SxProps<Theme>;
}

const AuthButton = (props: IAuthButtonProps) => {
    const { sx } = props;

    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    const onButtonClicked = useCallback(() => {
        if (isAuthenticated) {
            logout();
            return;
        }

        loginWithRedirect({
            connection: "discord",
        });
    }, [loginWithRedirect, logout, isAuthenticated]);

    return (
        <Button sx={sx} onClick={onButtonClicked}>
            {isAuthenticated ? "Logout" : "Login"}
        </Button>
    );
};

export default AuthButton;
