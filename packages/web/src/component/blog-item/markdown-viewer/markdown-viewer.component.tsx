import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import MuiMarkdown from "mui-markdown";
import React from "react";

interface IMarkdownViewerProps {
    sx?: SxProps<Theme>;
    value: string;
}

const MarkdownViewer = (props: IMarkdownViewerProps) => {
    const { sx, value } = props;

    const fixedValue = React.useMemo(() => value.replaceAll("\n", "  \n"), [value]);

    return (
        <Box sx={sx}>
            <MuiMarkdown options={{ disableParsingRawHTML: false }}>{fixedValue}</MuiMarkdown>
        </Box>
    );
};

export default MarkdownViewer;
