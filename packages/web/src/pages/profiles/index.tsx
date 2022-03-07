import Typography from "@mui/material/Typography";
import React from "react";
import { browserClient } from "../../client/browser.client";
import { AuthRequired } from "../../component/auth/auth-required/auth-required.component";
import { FileUpload } from "../../component/common/file-upload.component";
import { Urls } from "../../constants/constants.client";
import { useBreadcrumb } from "../../hook/use-breadcrumb.hook";

const MyProfilePage = () => {
    useBreadcrumb([Urls.Profile]);

    return (
        <AuthRequired>
            <Typography variant={"h1"}>Eigenes Profil!</Typography>

            <FileUpload onSubmit={(file) => browserClient.profiles.uploadMyImage(file)} />
        </AuthRequired>
    );
};

export default MyProfilePage;
