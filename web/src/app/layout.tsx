import { AppBar } from "@/component/layout/app-bar";
import { Breadcrumbs } from "@/component/layout/breadcrumbs";
import { LayoutProps } from "@/model/next";
import { synbaseTheme } from "@/style/theme";
import { getEnv } from "@/util/env";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Container, CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import dayjs from "dayjs";
import "dayjs/locale/de";
import { Metadata } from "next";
import PlausibleProvider from "next-plausible";

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
                <PlausibleProvider domain={getEnv("PLAUSIBLE_DOMAIN")} />
            </head>

            <body>
                <UserProvider>
                    <AppRouterCacheProvider>
                        <ThemeProvider theme={synbaseTheme}>
                            <CssBaseline />

                            <AppBar sx={{ mb: 4 }} />

                            <Container component={"main"} maxWidth={"xl"}>
                                <Stack gap={4}>
                                    <Breadcrumbs />

                                    {children}
                                </Stack>
                            </Container>
                        </ThemeProvider>
                    </AppRouterCacheProvider>
                </UserProvider>
            </body>
        </html>
    );
};

export default RootLayout;
