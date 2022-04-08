import { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import _ from "lodash";
import Markdown from "mui-markdown";
import React from "react";

interface IMarkdownViewerProps {
    sx?: SxProps<Theme>;
    children: string;
}

const MarkdownViewer = (props: IMarkdownViewerProps) => {
    const { sx, children } = props;

    const markdown = React.useMemo(() => _.replace(children, new RegExp("\n", "g"), "  \n"), [children]);

    return (
        <Box sx={sx}>
            <Markdown>{markdown}</Markdown>
        </Box>
    );
};

export default MarkdownViewer;
