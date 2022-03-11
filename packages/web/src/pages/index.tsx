import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ApiResource } from "@synbase/shared";
import _ from "lodash";
import { GetStaticProps } from "next";
import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getClient } from "../client/server.client";
import { AuthButton } from "../component/auth/auth-button/auth-button.component";
import { Urls } from "../constants/constants.client";
import { useSynbase } from "../hook/client/use-synbase.hook";
import { useBreadcrumb } from "../hook/layout/use-breadcrumb.hook";
import { IWithDehydratedState } from "../model/page-props.model";

const IndexPage = () => {
    useBreadcrumb([Urls.Home]);

    const synbase = useSynbase();
    const result = useQuery(ApiResource.App, synbase.app.get);

    const { data: app } = result;

    if (_.isUndefined(app)) {
        return <CircularProgress />;
    }

    if (result.isError) {
        return null;
    }

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

export const getStaticProps: GetStaticProps<IWithDehydratedState> = async () => {
    const client = await getClient();
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(ApiResource.App, client.app.get);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default IndexPage;
