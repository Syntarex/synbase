"use client";

import { Box, Stack, SxProps } from "@mui/material";
import MuiMarkdown, { MuiMarkdownProps } from "mui-markdown";
import { Highlight, themes } from "prism-react-renderer";

interface MarkdownProps extends Pick<MuiMarkdownProps, "hideLineNumbers"> {
    sx?: SxProps;
    children: string;
}

export const Markdown = ({ sx, children, hideLineNumbers }: MarkdownProps) => {
    return (
        <Box sx={sx}>
            <MuiMarkdown
                Highlight={Highlight}
                themes={themes}
                prismTheme={themes.github}
                hideLineNumbers={hideLineNumbers}
                options={{
                    wrapper: ({ children }) => <Stack spacing={2}>{children}</Stack>,
                }}
            >
                {children}
            </MuiMarkdown>
        </Box>
    );
};
