import { LayoutProps } from "@/model/layout";
import { synbaseTheme } from "@/style/theme";
import { getEnv } from "@/util/env";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Metadata } from "next";
import PlausibleProvider from "next-plausible";

export const metadata: Metadata = {
    title: "Synbase",
    description:
        "Willkommen auf der Synbase, dem zentralen Anlaufpunkt für unsere familiäre Discord-Community. Tauche ein in entspannte YouTube-Streams, interagiere mit Gleichgesinnten auf unserem Discord-Server oder spiele kostenlos auf unseren Game-Servern. Lehn dich zurück und sei Teil unserer wachsenden Community!",
};

const RootLayout = ({ children }: LayoutProps) => {
    return (
        <html lang={"de"}>
            <head>
                <PlausibleProvider domain={getEnv("PLAUSIBLE_DOMAIN")} />
            </head>

            <body>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={synbaseTheme}>
                        <CssBaseline />

                        <Container>{children}</Container>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
};

export default RootLayout;
