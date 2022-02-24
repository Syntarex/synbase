import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { IApp } from "@synbase/shared";
import _ from "lodash";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { useRecoilState } from "recoil";
import { synbase } from "../src/client";
import { testAtom } from "../src/data/test.atoms";

export interface IHomeProps {
    app: IApp;
}

const Home = (props: IHomeProps) => {
    const { app } = props;

    const { data: session } = useSession();

    const [count, setCount] = useRecoilState(testAtom);

    const onButtonPressed = React.useCallback(() => {
        if (_.isNull(session)) {
            signIn();
            return;
        }

        signOut();
    }, [session]);

    const onCountPressed = React.useCallback(() => setCount(count + 1), [count, setCount]);

    React.useEffect(() => {
        console.log(session);
    }, [session]);

    return (
        <Container fixed>
            <Grid container spacing={2}>
                <Grid item justifyContent={"center"} alignItems={"center"}>
                    <Typography variant={"h1"}>Hello Synbase v{app.version}!</Typography>
                    <Typography>{!_.isNull(session) ? "Du bist eingeloggt." : "Du bist NICHT eingeloggt."}</Typography>
                    <Button onClick={onButtonPressed}>{!_.isNull(session) ? "Logout" : "Login"}</Button>
                    <Button onClick={onCountPressed}>Der Count ist {count}</Button>
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
