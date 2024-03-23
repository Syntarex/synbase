"use client";

import { Box, Fab, FabProps, useTheme } from "@mui/material";

/**
 * Ein Floating Action Button, welcher in der unteren rechten Ecke der Seite angezeigt wird.
 */
export const FabButton = (props: FabProps) => {
    const theme = useTheme();

    return (
        <Box sx={{ position: "fixed", zIndex: 4000, right: theme.spacing(4), bottom: theme.spacing(4) }}>
            <Fab {...props} />
        </Box>
    );
};
