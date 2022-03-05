import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { useAuth } from "../../hook/use-auth.hook";
import { Link } from "../common/link.component";
import { Logo } from "./logo/logo.component";
import { SocialsMenu } from "./socials-menu/socials-menu.component";

interface ILayoutProps {
    children: React.ReactNode;
}

export const Layout = (props: ILayoutProps) => {
    const { children } = props;

    const auth = useAuth();

    return (
        <>
            <AppBar position={"static"}>
                <Toolbar>
                    <Link href={"/"}>
                        <Logo width={26} height={26} />
                    </Link>

                    <Stack
                        direction={"row"}
                        spacing={2}
                        alignItems={"center"}
                        justifyContent={"center"}
                        sx={{ flexGrow: 1 }}
                    >
                        <Link href={"/"}>
                            <Typography variant={"h6"}>Discord</Typography>
                        </Link>
                    </Stack>

                    <SocialsMenu />
                </Toolbar>
            </AppBar>

            <Container>{children}</Container>
        </>
    );
};
