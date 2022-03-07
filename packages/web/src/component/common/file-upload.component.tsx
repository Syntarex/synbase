import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import _ from "lodash";
import React from "react";
import { browserClient } from "../../client/browser.client";

export const FileUpload = () => {
    const [file, setFile] = React.useState<File | null>(null);

    const onChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (_.isNull(event.target.files)) {
            setFile(null);
            return;
        }

        setFile(event.target.files.item(0));
    }, []);

    const onSubmit = React.useCallback(async () => {
        if (_.isNull(file)) {
            return;
        }

        console.log(await browserClient.profiles.uploadMyImage(file));
    }, [file]);

    return (
        <Box>
            <input type={"file"} name={"file"} onChange={onChange} />
            <Button onClick={onSubmit} disabled={_.isNull(file)}>
                Upload
            </Button>
        </Box>
    );
};
