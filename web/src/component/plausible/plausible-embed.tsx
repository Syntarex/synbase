"use client";

import { ensure } from "@/util/string";
import { Box, BoxProps } from "@mui/material";

// TODO: Prüfen ob das TODO noch aktuell ist
// TODO: Breite des iframe-Inhalts passt nicht und hat ein Padding
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
                src={ensure(process.env.PLAUSIBLE_IFRAME)}
                loading={"lazy"}
                style={{ width: "100%", height: "100%", border: 0 }}
            ></iframe>

            <script async src="https://plausible.io/js/embed.host.js"></script>
        </Box>
    );
};
