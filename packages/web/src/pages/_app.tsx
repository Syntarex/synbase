import { Auth0Provider } from "@auth0/auth0-react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/de";
import { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import "../../styles/globals.css";
import synbaseTheme from "../../styles/theme/synbase.theme";
import ErrorBoundary from "../component/error/error-boundary/error-boundary.component";
import Layout from "../component/layout";
import createEmotionCache from "../util/create-emotion-cache.util";

dayjs.locale("de");

interface IMyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props: IMyAppProps) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    /* TODO: Warum ein State und nicht ein Memo? */
    const [queryClient] = useState(
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
            <Auth0Provider
                domain={"synbase-dev.eu.auth0.com"}
                clientId={"oHXq5yqvbubEPvu7Zs2CBw83Gdxe1Ix8"}
                redirectUri={"https://localhost:8080"}
            >
                <RecoilRoot>
                    <ErrorBoundary>
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
                    </ErrorBoundary>
                </RecoilRoot>
            </Auth0Provider>
        </CacheProvider>
    );
};

export default MyApp;
