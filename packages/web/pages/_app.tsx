import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { RecoilRoot } from "recoil";
import { AuthHandler } from "../src/component/auth/auth-handler/auth-handler.component";
import createEmotionCache from "../src/util/create-emotion-cache.util";
import "../styles/globals.css";
import synbaseTheme from "../styles/theme/synbase.theme";

interface IMyAppProps extends AppProps {
    emotionCache?: EmotionCache;
    session: Session;
}

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props: IMyAppProps) => {
    const { session, Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <RecoilRoot>
            <SessionProvider session={session}>
                <CacheProvider value={emotionCache}>
                    <AuthHandler>
                        <Head>
                            <meta name="viewport" content="initial-scale=1, width=device-width" />
                        </Head>

                        <ThemeProvider theme={synbaseTheme}>
                            <CssBaseline />
                            <Component {...pageProps} />
                        </ThemeProvider>
                    </AuthHandler>
                </CacheProvider>
            </SessionProvider>
        </RecoilRoot>
    );
};

export default MyApp;
