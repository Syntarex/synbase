import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import "../../styles/globals.css";
import synbaseTheme from "../../styles/theme/synbase.theme";
import { SynbaseProvider } from "../component/client/synbase.provider";
import { ErrorHandler } from "../component/error/error-handler/error-handler.component";
import { ErrorList } from "../component/error/error-list/error-list.component";
import { Layout } from "../component/layout";
import createEmotionCache from "../util/create-emotion-cache.util";

interface IMyAppProps extends AppProps {
    emotionCache?: EmotionCache;
    session: Session;
}

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props: IMyAppProps) => {
    const { session, Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        useErrorBoundary: true,
                    },
                    mutations: {
                        useErrorBoundary: true,
                    },
                },
            }),
    );

    return (
        <CacheProvider value={emotionCache}>
            <RecoilRoot>
                <ErrorHandler>
                    <SessionProvider session={session}>
                        <SynbaseProvider>
                            <QueryClientProvider client={queryClient}>
                                <Hydrate state={pageProps.dehydratedState}>
                                    <Head>
                                        <meta name="viewport" content="initial-scale=1, width=device-width" />
                                    </Head>

                                    <ThemeProvider theme={synbaseTheme}>
                                        <CssBaseline />
                                        <Layout>
                                            <ErrorList />

                                            <Component {...pageProps} />
                                        </Layout>
                                    </ThemeProvider>
                                </Hydrate>
                            </QueryClientProvider>
                        </SynbaseProvider>
                    </SessionProvider>
                </ErrorHandler>
            </RecoilRoot>
        </CacheProvider>
    );
};

export default MyApp;
