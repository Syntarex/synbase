import Stack from "@mui/material/Stack";
import _ from "lodash";
import { GetStaticProps } from "next";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { getSynbase } from "../client/server.client";
import { AuthButton } from "../component/auth/auth-button/auth-button.component";
import RichTextEditor from "../component/common/rich-text-editor/rich-text-editor.component";
import { Urls } from "../constants/constants.client";
import { getApp } from "../data/app/app.queries";
import { useBreadcrumb } from "../hook/layout/use-breadcrumb.hook";
import { IWithDehydratedState } from "../model/page-props.model";

const IndexPage = () => {
    useBreadcrumb([Urls.Home]);

    const onChange = React.useCallback((value) => _.isString(value) && console.log(value), []);

    return (
        <Stack>
            <RichTextEditor onChange={onChange} />

            <AuthButton />
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
