import "server-only";

import { ErrorBoundary } from "@/component/common/error-boundary";
import { Loading } from "@/component/common/loading";
import { AppBar } from "@/component/layout/app-bar";
import { Breadcrumbs } from "@/component/layout/breadcrumbs/breadcrumbs";
import { QueryClientProvider } from "@/component/provider/query-client-provider";
import { GithubButton } from "@/component/social/github-button";
import { LayoutProps } from "@/model/next";
import { synbaseTheme } from "@/style/theme";
import { getEnv } from "@/util/server/env";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Container, CssBaseline, Fade, Stack, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import dayjs from "dayjs";
import "dayjs/locale/de";
import { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import { extractRouterConfig } from "uploadthing/server";
import { uploadRouter } from "./api/uploadthing/core";

// Setze Sprache von DayJS auf Deutsch
dayjs.locale("de");

export const metadata: Metadata = {
    title: "Synbase",
    description:
        "Willkommen auf der Synbase, dem zentralen Anlaufpunkt für unsere familiäre Discord-Community. Tauche ein in entspannte YouTube-Streams, interagiere mit Gleichgesinnten auf unserem Discord-Server oder spiele kostenlos auf unseren Game-Servern. Lehn dich zurück und sei Teil unserer wachsenden Community!",
};

const RootLayout = async ({ children }: LayoutProps) => {
    return (
        <html lang={"de"}>
            <head>
                <PlausibleProvider
                    selfHosted
                    customDomain={getEnv("PLAUSIBLE_HOST")}
                    domain={getEnv("PLAUSIBLE_DOMAIN")}
                />
            </head>

            <body>
                <ErrorBoundary>
                    <UserProvider>
                        <QueryClientProvider>
                            <NextSSRPlugin routerConfig={extractRouterConfig(uploadRouter)} />

                            <AppRouterCacheProvider>
                                <ThemeProvider theme={synbaseTheme}>
                                    <CssBaseline />

                                    <AppBar sx={{ mb: 4 }} />

                                    <Container component={"main"} maxWidth={"xl"}>
                                        <Stack gap={4}>
                                            <Breadcrumbs />

                                            <Loading>{children}</Loading>

                                            <Fade in timeout={3000}>
                                                <Stack direction={"row"} justifyContent={"center"}>
                                                    <GithubButton />
                                                </Stack>
                                            </Fade>
                                        </Stack>
                                    </Container>
                                </ThemeProvider>
                            </AppRouterCacheProvider>
                        </QueryClientProvider>
                    </UserProvider>
                </ErrorBoundary>
            </body>
        </html>
    );
};

export default RootLayout;
