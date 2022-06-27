import { Theme } from "@emotion/react";
import { Box, SxProps, TextField } from "@mui/material";
import _ from "lodash";
import { useCallback } from "react";

interface IMarkdownEditorProps {
    sx?: SxProps<Theme>;
    value: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
}

const MarkdownEditor = (props: IMarkdownEditorProps) => {
    const { sx, value, onChange, disabled } = props;

    const onTextChanged = useCallback(
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
