import { useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import { Urls } from "../../constants/constants.client";
import Link from "../common/link/link.component";
import ErrorList from "../error/error-list/error-list.component";
import { Breadcrumb } from "./breadcrumb/breadcrumb.component";
import Logo from "./logo/logo.component";
import SocialsMenu from "./socials-menu/socials-menu.component";

interface ILayoutProps {
    children: React.ReactNode;
}

const Layout = (props: ILayoutProps) => {
    const { children } = props;

    const theme = useTheme();

    return (
        <>
            <AppBar position={"static"}>
                <Toolbar>
                    <Link href={Urls.Home}>
                        <Logo width={26} height={26} />
                    </Link>

                    <Breadcrumb
                        sx={(theme) => ({ flexGrow: 1, paddingLeft: theme.spacing(4), paddingRight: theme.spacing(4) })}
                    />

                    <SocialsMenu />
                </Toolbar>
            </AppBar>

            <Container sx={(theme) => ({ marginTop: theme.spacing(4) })}>
                <ErrorList
                    sx={{
                        marginBottom: theme.spacing(4),
                    }}
                />

                {children}
            </Container>
        </>
    );
};

export default Layout;
