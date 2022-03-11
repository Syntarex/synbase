import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import _ from "lodash";
import React from "react";
import { useDropzone } from "react-dropzone";
import { ClientEnv } from "../../../constants/constants.client";
import { useAddError } from "../../../hook/use-errors.hook";

interface IFileChooserProps {
    children: React.ReactNode;
    sx?: SxProps;
    onChange: (file: File | null) => void;
    disabled?: boolean;
}

const FileChooser = (props: IFileChooserProps) => {
    const { sx, onChange, children, disabled } = props;

    const addError = useAddError();

    const { getInputProps, getRootProps, acceptedFiles, fileRejections } = useDropzone({
        maxFiles: 1,
        maxSize: ClientEnv.apiImageSizeLimit,
        accept: ["image/png", "image/jpg", "image/jpeg"],
        disabled,
    });

    React.useEffect(() => {
        if (_.isEmpty(acceptedFiles)) {
            onChange(null);
            return;
        }

        onChange(acceptedFiles[0]);
    }, [acceptedFiles, onChange]);

    React.useEffect(() => {
        if (_.isEmpty(fileRejections)) {
            return;
        }

        /* TODO: Funktioniert das? */
        for (const error of fileRejections[0].errors) {
            addError(new Error(error.message));
        }
    }, [fileRejections]);

    return (
        <Box sx={sx} {...getRootProps()}>
            <input {...getInputProps()} />

            {children}
        </Box>
    );
};

export default FileChooser;
