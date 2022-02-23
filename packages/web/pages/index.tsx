import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { IApp } from "@synbase/shared";
import React from "react";
import { synbase } from "../src/client";

export interface IHomeProps {
    app: IApp;
}

const Home = (props: IHomeProps) => {
    const { app } = props;

    return (
        <Container fixed>
            <Grid container spacing={2}>
                <Grid item justifyContent={"center"} alignItems={"center"}>
                    <Typography variant={"h1"}>Hello Synbase v{app.version}!</Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export async function getStaticProps() {
    const app = await synbase.app.get();

    return {
        props: {
            app,
        },
    };
}

export default Home;
