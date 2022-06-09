import { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import _ from "lodash";
import React from "react";

interface ITabPageProps {
    sx?: SxProps<Theme>;
    index: number;
    value: number;
    children: React.ReactNode;
}

const TabPage = (props: ITabPageProps) => {
    const { sx, index, value, children } = props;

    if (!_.isEqual(index, value)) {
        return null;
    }

    return <Box sx={sx}>{children}</Box>;
};

export default TabPage;
