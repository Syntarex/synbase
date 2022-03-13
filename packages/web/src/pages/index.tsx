import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ApiResource } from "@synbase/shared";
import { GetStaticProps } from "next";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { getClient } from "../client/server.client";
import { AuthButton } from "../component/auth/auth-button/auth-button.component";
import { Fetch } from "../component/common/fetch/fetch.component";
import { Urls } from "../constants/constants.client";
import { useSynbase } from "../hook/client/use-synbase.hook";
import { useBreadcrumb } from "../hook/layout/use-breadcrumb.hook";
import { IWithDehydratedState } from "../model/page-props.model";

const IndexPage = () => {
    useBreadcrumb([Urls.Home]);

    const synbase = useSynbase();

    return (
        <Container fixed>
            <Grid container spacing={2}>
                <Grid item justifyContent={"center"} alignItems={"center"}>
                    <Fetch
                        selector={{
                            queryKey: ApiResource.App,
                            queryFn: synbase.app.get,
                        }}
                        renderOnSuccess={(app) => <Typography variant={"h1"}>Hello Synbase v{app.version}!</Typography>}
                    />

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
