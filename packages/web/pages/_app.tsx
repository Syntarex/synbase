import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { KeycloakCookies, Persistors, SSRKeycloakProvider } from "@react-keycloak/nextjs";
import type { AppContext, AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { keycloakConfig } from "../src/auth/keycloak.config";
import { parseCookies } from "../src/auth/keycloak.function";
import createEmotionCache from "../src/util/create-emotion-cache.util";
import "../styles/globals.css";
import synbaseTheme from "../styles/theme/synbase.theme";

interface IMyAppProps extends AppProps {
    emotionCache?: EmotionCache;
    cookies: KeycloakCookies;
}

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props: IMyAppProps) => {
    const { cookies, Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <SSRKeycloakProvider keycloakConfig={keycloakConfig} persistor={Persistors.Cookies(cookies)}>
            <CacheProvider value={emotionCache}>
                <Head>
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                </Head>

                <ThemeProvider theme={synbaseTheme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </CacheProvider>
        </SSRKeycloakProvider>
    );
};

export async function getInitialProps(context: AppContext) {
    console.log("works");
    return {
        cookies: parseCookies(context?.ctx?.req),
    };
}
export default MyApp;
