import Typography from "@mui/material/Typography";
import React from "react";
import { AuthRequired } from "../../component/auth/auth-required/auth-required.component";
import { Urls } from "../../constants/constants.client";
import { useBreadcrumb } from "../../hook/use-breadcrumb.hook";

const DiscordServerPage = () => {
    useBreadcrumb([Urls.Discord, Urls.DiscordServer]);

    return (
        <AuthRequired>
            <Typography variant={"h1"}>Discord Server</Typography>
        </AuthRequired>
    );
};

export default DiscordServerPage;
