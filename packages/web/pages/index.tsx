import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type { NextPage } from "next";
import React from "react";

const Home: NextPage = () => {
    return (
        <Container fixed>
            <Grid container spacing={2}>
                <Grid item justifyContent={"center"} alignItems={"center"}>
                    <Typography variant={"h1"}>Hello Synbase!</Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
