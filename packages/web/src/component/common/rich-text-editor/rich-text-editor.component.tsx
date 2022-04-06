import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Editor, EditorState } from "draft-js";
import _ from "lodash";
import React from "react";
import { editorStateFromString, editorStateToString } from "../../../util/draft.util";

interface IRichTextEditorProps {
    sx?: SxProps<Theme>;
    initialValue?: string;
    disabled?: boolean;
    onChange: (value: string) => void;
}

const RichTextEditor = (props: IRichTextEditorProps) => {
    const { sx, onChange, initialValue } = props;

    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

    React.useEffect(
        () => (_.isUndefined(initialValue) ? undefined : setEditorState(editorStateFromString(initialValue))),
        [initialValue],
    );

    const editor = React.useRef<Editor>(null);

    const onSubmit = React.useCallback(() => onChange(editorStateToString(editorState)), [onChange, editorState]);

    const focusEditor = React.useCallback(() => {
        const { current } = editor;

        if (_.isNull(current)) {
            return;
        }

        current.focus();
    }, [editor]);

    return (
        <Stack sx={sx} spacing={2} onClick={focusEditor}>
            <Editor ref={editor} editorState={editorState} onChange={setEditorState} />

            <Button variant={"contained"} onClick={onSubmit}>
                Speichern
            </Button>
        </Stack>
    );
};

export default RichTextEditor;
