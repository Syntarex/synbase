import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { IApp } from "@synbase/shared";
import { GetStaticProps } from "next";
import React from "react";
import { getPublicClient } from "../client/server.client";
import { AuthButton } from "../component/auth/auth-button/auth-button.component";

export interface IIndexPageProps {
    app: IApp;
}

const IndexPage = (props: IIndexPageProps) => {
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

export const getStaticProps: GetStaticProps<IIndexPageProps> = async () => {
    const client = await getPublicClient();

    return {
        props: {
            app: await client.app.get(),
        },
    };
};

export default IndexPage;
