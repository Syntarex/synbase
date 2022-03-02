import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { IApp } from "@synbase/shared";
import { GetStaticProps } from "next";
import React from "react";
import { getServerClient } from "../src/client/server.client";
import { AuthButton } from "../src/component/auth/auth-button/auth-button.component";

export interface IHomePageProps {
    app: IApp;
}

const HomePage = (props: IHomePageProps) => {
    const { app } = props;

    return (
        <Container fixed>
            <Grid container spacing={2}>
                <Grid item justifyContent={"center"} alignItems={"center"}>
                    <Typography variant={"h1"}>Hello Synbase v{app.version}!</Typography>
                    <AuthButton />
                </Grid>
            </Grid>
        </Container>
    );
};

export const getStaticProps: GetStaticProps<IHomePageProps> = async () => {
    const client = await getServerClient();

    const app: IApp = await client.app.get();

    return {
        props: {
            app,
        },
    };
};

export default HomePage;
