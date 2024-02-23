import { LayoutProps } from "@/model/layout";
import { synbaseTheme } from "@/style/theme";
import { getEnv } from "@/util/env";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Container, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import Database from "@synbase/database";
import { Metadata } from "next";
import PlausibleProvider from "next-plausible";

export const metadata: Metadata = {
    title: "Synbase",
    description:
        "Willkommen auf der Synbase, dem zentralen Anlaufpunkt für unsere familiäre Discord-Community. Tauche ein in entspannte YouTube-Streams, interagiere mit Gleichgesinnten auf unserem Discord-Server oder spiele kostenlos auf unseren Game-Servern. Lehn dich zurück und sei Teil unserer wachsenden Community!",
};

const RootLayout = async ({ children }: LayoutProps) => {
    const profiles = await Database.profile.findMany();

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

                            <Container>
                                {children}

                                <Typography sx={{ display: "none" }}>Es gibt {profiles.length} Profile.</Typography>
                            </Container>
                        </ThemeProvider>
                    </AppRouterCacheProvider>
                </UserProvider>
            </body>
        </html>
    );
};

export default RootLayout;
