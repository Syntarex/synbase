import "server-only";

import { Grid, GridProps } from "@mui/material";
import { isArray } from "lodash";
import { ReactNode } from "react";

interface CardGridProps {
    children?: ReactNode;
    gridProps?: GridProps;
}

export const CardGrid = ({ children, gridProps }: CardGridProps) => {
    if (!children) {
        return null;
    }

    return (
        <Grid container gap={4} alignItems={"stretch"} {...gridProps}>
            {(isArray(children) ? children : [children]).map((each, index) => (
                <Grid item key={`card-grid-${index}`} xs={12} sm={12} md={4} xl={4}>
                    {each}
                </Grid>
            ))}
        </Grid>
    );
};
