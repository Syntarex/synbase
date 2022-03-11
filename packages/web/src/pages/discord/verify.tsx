import Typography from "@mui/material/Typography";
import React from "react";
import { AuthRequired } from "../../component/auth/auth-required/auth-required.component";
import { Urls } from "../../constants/constants.client";
import { useBreadcrumb } from "../../hook/layout/use-breadcrumb.hook";

const DiscordVerifyPage = () => {
    useBreadcrumb([Urls.Discord, Urls.DiscordVerify]);

    return (
        <AuthRequired>
            <Typography variant={"h1"}>Discord Verifizieren</Typography>
        </AuthRequired>
    );
};

export default DiscordVerifyPage;
