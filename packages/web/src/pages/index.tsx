import Stack from "@mui/material/Stack";
import { GetStaticProps } from "next";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { getSynbase } from "../client/server.client";
import MarkdownEditor from "../component/common/markdown-editor/markdown-editor.component";
import MarkdownViewer from "../component/common/markdown-viewer/markdown-viewer.component";
import { Urls } from "../constants/constants.client";
import { getApp } from "../data/app/app.queries";
import { useBreadcrumb } from "../hook/layout/use-breadcrumb.hook";
import { IWithDehydratedState } from "../model/page-props.model";

const IndexPage = () => {
    useBreadcrumb([Urls.Home]);

    const [markdown, setMarkdown] = React.useState("");

    return (
        <Stack spacing={4}>
            <MarkdownEditor value={markdown} onChange={setMarkdown} />

            <MarkdownViewer>{markdown}</MarkdownViewer>
        </Stack>
    );
};

export const getStaticProps: GetStaticProps<IWithDehydratedState> = async () => {
    const synbase = await getSynbase();
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(getApp(synbase));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default IndexPage;
