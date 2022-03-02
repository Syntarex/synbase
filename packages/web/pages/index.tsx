import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { IApp } from "@synbase/shared";
import _ from "lodash";
import { signIn, signOut } from "next-auth/react";
import React from "react";
import { publicClient } from "../src/client/synbase.client";
import { useSession } from "../src/hook/use-session.hook";
import { IPageProps } from "../src/model/page-props.model";

export interface IHomePageProps {
    app: IApp;
}

const HomePage = (props: IHomePageProps) => {
    const { app } = props;

    const session = useSession();

    const onButtonPressed = React.useCallback(() => {
        if (_.isNull(session)) {
            signIn();
            return;
        }

        signOut();
    }, [session]);

    return (
        <Container fixed>
            <Grid container spacing={2}>
                <Grid item justifyContent={"center"} alignItems={"center"}>
                    <Typography variant={"h1"}>Hello Synbase v{app.version}!</Typography>
                    <Button onClick={onButtonPressed}>{!_.isNull(session) ? "Logout" : "Login"}</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export async function getStaticProps(): Promise<IPageProps<IHomePageProps>> {
    const app: IApp = await publicClient.app.get();

    return {
        props: {
            app,
        },
    };
}

export default HomePage;
