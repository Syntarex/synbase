import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import { useAuth } from "../../hook/use-auth.hook";
import { Link } from "../common/link.component";
import { Breadcrumb } from "./breadcrumb/breadcrumb.component";
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

                    <Breadcrumb
                        sx={(theme) => ({ flexGrow: 1, paddingLeft: theme.spacing(4), paddingRight: theme.spacing(4) })}
                    />

                    <SocialsMenu />
                </Toolbar>
            </AppBar>

            <Container>{children}</Container>
        </>
    );
};
