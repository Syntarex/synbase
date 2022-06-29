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
import { SynbaseProvider } from "../component/client/synbase.provider";
import ErrorBoundary from "../component/error/error-boundary/error-boundary.component";
import Layout from "../component/layout";
import { CLIENT_ENV } from "../constants/constants.client";
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
                useRefreshTokens
                domain={CLIENT_ENV.AUTH0_DOMAIN}
                clientId={CLIENT_ENV.AUTH0_CLIENT_ID}
                redirectUri={CLIENT_ENV.WEB_URL}
                audience={CLIENT_ENV.AUTH0_AUDIENCE}
            >
                <RecoilRoot>
                    <ErrorBoundary>
                        <QueryClientProvider client={queryClient}>
                            <Hydrate state={pageProps.dehydratedState}>
                                <SynbaseProvider>
                                    <Head>
                                        <meta name="viewport" content="initial-scale=1, width=device-width" />
                                    </Head>

                                    <ThemeProvider theme={synbaseTheme}>
                                        <CssBaseline />
                                        <Layout>
                                            <Component {...pageProps} />
                                        </Layout>
                                    </ThemeProvider>
                                </SynbaseProvider>
                            </Hydrate>
                        </QueryClientProvider>
                    </ErrorBoundary>
                </RecoilRoot>
            </Auth0Provider>
        </CacheProvider>
    );
};

export default MyApp;
