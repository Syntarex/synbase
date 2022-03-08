import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import React from "react";
import { browserClient } from "../../client/browser.client";
import { AuthRequired } from "../../component/auth/auth-required/auth-required.component";
import { FileChooser } from "../../component/common/file-chooser.component";
import { Urls } from "../../constants/constants.client";
import { useBreadcrumb } from "../../hook/use-breadcrumb.hook";

const MyProfilePage = () => {
    useBreadcrumb([Urls.Profile]);

    const [file, setFile] = React.useState<File | null>(null);

    const onSubmit = React.useCallback(() => {
        if (_.isNull(file)) {
            return;
        }

        browserClient.profiles.uploadMyImage(file);
    }, [file]);

    return (
        <AuthRequired>
            <Typography variant={"h1"}>Eigenes Profil!</Typography>

            <FileChooser onChange={setFile}>
                <Typography>File wühlen</Typography>
            </FileChooser>

            <Button variant={"contained"} onClick={onSubmit} disabled={_.isNull(file)}>
                Upload
            </Button>
        </AuthRequired>
    );
};

export default MyProfilePage;
