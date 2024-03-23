"use client";

import { Edit, Preview } from "@mui/icons-material";
import { Paper, Stack, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { InputProps } from "./form";
import { Markdown } from "./markdown";

// TODO: JSDocs
export const MarkdownEditor = (props: InputProps<string>) => {
    // Der Modus des Inhalts-Feldes
    const [contentMode, setContentMode] = useState<"edit" | "preview">("edit");

    return (
        <Stack>
            <Stack direction={"row"} alignItems={"flex-end"} justifyContent={"space-between"} spacing={1}>
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
        </Stack>
    );
};
