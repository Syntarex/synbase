"use client";

import { Edit, Preview } from "@mui/icons-material";
import {
    FormControl,
    FormLabel,
    Paper,
    Stack,
    TextField,
    TextFieldProps,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";
import { Markdown } from "./markdown";

interface MarkdownEditorProps extends Omit<TextFieldProps, "value"> {
    value?: string;
}

export const MarkdownEditor = (props: MarkdownEditorProps) => {
    // Der Modus des Inhalts-Feldes
    const [contentMode, setContentMode] = useState<"edit" | "preview">("edit");

    return (
        <FormControl disabled={props.disabled}>
            <Stack direction={"row"} alignItems={"flex-end"} justifyContent={"space-between"} spacing={1}>
                <FormLabel error={props.error}>Inhalt</FormLabel>

                <ToggleButtonGroup
                    exclusive
                    value={contentMode}
                    onChange={(event, contentMode) => setContentMode(contentMode)}
                >
                    <ToggleButton value={"edit"}>
                        <Edit />
                    </ToggleButton>

                    <ToggleButton value={"preview"}>
                        <Preview />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>

            {contentMode === "edit" && <TextField multiline minRows={6} maxRows={30} {...props} />}

            {contentMode === "preview" && (
                <Paper sx={{ p: 4 }}>
                    <Markdown>{props.value ?? ""}</Markdown>
                </Paper>
            )}
        </FormControl>
    );
};
