import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import _ from "lodash";
import React from "react";

interface IMarkdownEditorProps {
    sx?: SxProps<Theme>;
    value: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
}

const MarkdownEditor = (props: IMarkdownEditorProps) => {
    const { sx, value, onChange, disabled } = props;

    const onTextChanged = React.useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (disabled || _.isUndefined(onChange)) {
                return;
            }

            onChange(event.target.value);
        },
        [onChange, disabled],
    );

    return (
        <Box sx={sx}>
            <TextField
                fullWidth
                multiline
                label={"Markdown"}
                rows={8}
                variant={"outlined"}
                disabled={disabled}
                value={value}
                onChange={onTextChanged}
            />
        </Box>
    );
};

export default MarkdownEditor;
