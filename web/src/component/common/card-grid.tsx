import "server-only";

import { Grid, SxProps } from "@mui/material";
import { isArray } from "lodash";
import { ReactNode } from "react";

interface CardGridProps {
    sx?: SxProps;
    children?: ReactNode;
}

export const CardGrid = ({ sx, children }: CardGridProps) => {
    if (!children) {
        return null;
    }

    return (
        <Grid container sx={sx} gap={4}>
            {(isArray(children) ? children : [children]).map((each, index) => (
                <Grid item key={`card-grid-${index}`} sx={{ height: "100%" }} xs={12} sm={12} md={4} xl={4}>
                    {each}
                </Grid>
            ))}
        </Grid>
    );
};
