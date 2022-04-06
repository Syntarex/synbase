import { convertFromRaw, convertToRaw, EditorState } from "draft-js";

export const editorStateToString = (editorState: EditorState) =>
    JSON.stringify(convertToRaw(editorState.getCurrentContent()));

export const editorStateFromString = (value: string) =>
    EditorState.createWithContent(convertFromRaw(JSON.parse(value)));
