import { Box, SxProps, Theme } from "@mui/material";
import _ from "lodash";
import Markdown from "mui-markdown";
import { useMemo } from "react";

interface IMarkdownViewerProps {
    sx?: SxProps<Theme>;
    children: string;
}

const MarkdownViewer = (props: IMarkdownViewerProps) => {
    const { sx, children } = props;

    const markdown = useMemo(() => _.replace(children, new RegExp("\n", "g"), "  \n"), [children]);

    return (
        <Box sx={sx}>
            <Markdown>{markdown}</Markdown>
        </Box>
    );
};

export default MarkdownViewer;
