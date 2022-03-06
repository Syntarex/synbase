import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { IApp } from "@synbase/shared";
import { IKUpload } from "imagekitio-react";
import { GetStaticProps } from "next";
import React from "react";
import { getPublicClient } from "../client/server.client";
import { AuthButton } from "../component/auth/auth-button/auth-button.component";
import ImagekitImage from "../component/common/imagekit-image.component";
import { Urls } from "../constants/constants.client";
import { useBreadcrumb } from "../hook/use-breadcrumb.hook";

export interface IIndexPageProps {
    app: IApp;
}

const IndexPage = (props: IIndexPageProps) => {
    useBreadcrumb([Urls.Home]);

    const { app } = props;

    return (
        <Container fixed>
            <Grid container spacing={2}>
                <Grid item justifyContent={"center"} alignItems={"center"}>
                    <Typography variant={"h1"}>Hello Synbase v{app.version}!</Typography>
                    <AuthButton />

                    <IKUpload
                        fileName={"syntarex"}
                        folder={"profiles"}
                        onError={(error: any) => console.log(error)}
                        onSuccess={(result: any) => console.log(result)}
                    />

                    <ImagekitImage src={"/profiles/syntarex_mU4CUlpWUXw"} width={500} />
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
