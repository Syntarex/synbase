import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ApiResource } from "@synbase/shared";
import { IKContext } from "imagekitio-react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { RecoilRoot } from "recoil";
import "../../styles/globals.css";
import synbaseTheme from "../../styles/theme/synbase.theme";
import { AuthHandler } from "../component/auth/auth-handler/auth-handler.component";
import { Layout } from "../component/layout";
import { ClientEnv } from "../constants/constants.client";
import createEmotionCache from "../util/create-emotion-cache.util";

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
                        <IKContext
                            urlEndpoint={ClientEnv.imagekitUrl}
                            publicKey={ClientEnv.imagekitPublicKey}
                            authenticationEndpoint={`${ClientEnv.apiUrl}/${ApiResource.Image}/auth`}
                        >
                            <Head>
                                <meta name="viewport" content="initial-scale=1, width=device-width" />
                            </Head>

                            <ThemeProvider theme={synbaseTheme}>
                                <CssBaseline />
                                <Layout>
                                    <Component {...pageProps} />
                                </Layout>
                            </ThemeProvider>
                        </IKContext>
                    </AuthHandler>
                </CacheProvider>
            </SessionProvider>
        </RecoilRoot>
    );
};

export default MyApp;
