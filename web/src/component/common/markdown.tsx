"use client";

import { Box, BoxProps, Stack } from "@mui/material";
import MuiMarkdown from "mui-markdown";
import { Highlight, themes } from "prism-react-renderer";

interface MarkdownProps {
    /**
     * Akzeptiert Markdown.
     */
    children: string;
    boxProps?: BoxProps;
}

/**
 * Rendert Markdown-Text als MUI-Komponenten.
 */
export const Markdown = ({ children, boxProps }: MarkdownProps) => {
    return (
        <Box {...boxProps}>
            <MuiMarkdown
                Highlight={Highlight}
                themes={themes}
                prismTheme={themes.github}
                options={{
                    wrapper: ({ children }) => <Stack spacing={2}>{children}</Stack>,
                }}
            >
                {children}
            </MuiMarkdown>
        </Box>
    );
};
