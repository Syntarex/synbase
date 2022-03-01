import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { IApp } from "@synbase/shared";
import _ from "lodash";
import { signIn, signOut } from "next-auth/react";
import React from "react";
import { Fetch } from "../src/component/common/fetch.component";
import { getApp } from "../src/data/app/app.selectors";
import { getAllDiscordVerifications } from "../src/data/discord-verification/discord-verification.selectors";
import { useSession } from "../src/hook/use-session.hook";

export interface IHomeProps {
    app: IApp;
}

const Home = (props: IHomeProps) => {
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
                    <Typography>{!_.isNull(session) ? "Du bist eingeloggt." : "Du bist NICHT eingeloggt."}</Typography>
                    <Button onClick={onButtonPressed}>{!_.isNull(session) ? "Logout" : "Login"}</Button>

                    <Fetch selector={getApp}>{(app) => <Typography>{app.version}</Typography>}</Fetch>
                    <Fetch selector={getAllDiscordVerifications({})}></Fetch>
                </Grid>
            </Grid>
        </Container>
    );
};

export async function getStaticProps() {
    const app: IApp = {
        version: "mocked",
    };

    return {
        props: {
            app,
        },
    };
}

export default Home;
