import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useKeycloak } from "@react-keycloak/nextjs";
import { IApp } from "@synbase/shared";
import _ from "lodash";
import React from "react";
import { synbase } from "../src/client";

export interface IHomeProps {
    app: IApp;
}

const Home = (props: IHomeProps) => {
    const { app } = props;

    const { keycloak, initialized } = useKeycloak();

    const isLoggedIn = React.useMemo(() => {
        if (_.isUndefined(keycloak) || !initialized) {
            return false;
        }

        return keycloak.authenticated;
    }, [keycloak, initialized]);

    const onButtonPressed = React.useCallback(() => {
        if (_.isUndefined(keycloak) || !initialized) {
            alert("Nicht initialisiert.");
            return;
        }

        if (isLoggedIn) {
            keycloak.logout();
            return;
        }

        keycloak.login();
    }, [keycloak, initialized, isLoggedIn]);

    return (
        <Container fixed>
            <Grid container spacing={2}>
                <Grid item justifyContent={"center"} alignItems={"center"}>
                    <Typography variant={"h1"}>Hello Synbase v{app.version}!</Typography>
                    <Typography>{isLoggedIn ? "Du bist eingeloggt." : "Du bist NICHT eingeloggt."}</Typography>
                    <Button disabled={!initialized} onClick={onButtonPressed}>
                        {isLoggedIn ? "Logout" : "Login"}
                    </Button>
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
