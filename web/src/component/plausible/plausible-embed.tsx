"use client";

import { Box, BoxProps } from "@mui/material";

// TODO: Breite des iframe-Inhalts passt nicht und hat ein Padding
// TODO: Embed-URL in Umgebungsvariable
/**
 * Zeigt das Plausible Dashboard.
 */
export const PlausibleEmbed = (props: BoxProps) => {
    return (
        <Box
            {...props}
            sx={{
                // Gleiche Padding innerhalb des Plausible iframes aus
                marginLeft: "-1.5rem !important",
                marginRight: "-1.5rem !important",
                marginTop: "-1.5rem !important",
                ...props.sx,
            }}
        >
            <iframe
                plausible-embed={"true"}
                src={
                    "https://plausible.io/share/synbase.io?auth=vGNcW5HXARZcTwYlWA6fn&embed=true&theme=dark&background=transparent"
                }
                loading={"lazy"}
                style={{ width: "100%", height: "100%", border: 0 }}
            ></iframe>

            <script async src="https://plausible.io/js/embed.host.js"></script>
        </Box>
    );
};
