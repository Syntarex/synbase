import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/de";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import "../../styles/globals.css";
import synbaseTheme from "../../styles/theme/synbase.theme";
import { SynbaseProvider } from "../component/client/synbase.provider";
import ErrorBoundary from "../component/error/error-boundary/error-boundary.component";
import Layout from "../component/layout";
import { Constants } from "../constants/constants.client";
import createEmotionCache from "../util/create-emotion-cache.util";

dayjs.locale("de");

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
                        refetchOnWindowFocus: false,
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
                <ErrorBoundary>
                    <SessionProvider session={session} refetchInterval={Constants.sessionRefetchInterval}>
                        <SynbaseProvider>
                            <QueryClientProvider client={queryClient}>
                                <Hydrate state={pageProps.dehydratedState}>
                                    <Head>
                                        <meta name="viewport" content="initial-scale=1, width=device-width" />
                                    </Head>

                                    <ThemeProvider theme={synbaseTheme}>
                                        <CssBaseline />
                                        <Layout>
                                            <Component {...pageProps} />
                                        </Layout>
                                    </ThemeProvider>
                                </Hydrate>
                            </QueryClientProvider>
                        </SynbaseProvider>
                    </SessionProvider>
                </ErrorBoundary>
            </RecoilRoot>
        </CacheProvider>
    );
};

export default MyApp;
