import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import _ from "lodash";
import React from "react";

interface IFileUploadProps {
    sx?: SxProps;
    onSubmit: (file: File) => void;
}

export const FileUpload = (props: IFileUploadProps) => {
    const { sx, onSubmit } = props;

    const [file, setFile] = React.useState<File | null>(null);

    const onChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (_.isNull(event.target.files)) {
            setFile(null);
            return;
        }

        setFile(event.target.files.item(0));
    }, []);

    const onClick = React.useCallback(async () => {
        if (_.isNull(file)) {
            return;
        }

        onSubmit(file);
    }, [file]);

    return (
        <Box sx={sx}>
            <input type={"file"} name={"file"} onChange={onChange} />
            <Button onClick={onClick} disabled={_.isNull(file)}>
                Upload
            </Button>
        </Box>
    );
};
