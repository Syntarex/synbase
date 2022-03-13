import Typography from "@mui/material/Typography";
import _ from "lodash";
import React from "react";
import { Urls } from "../../constants/constants.client";
import { useAuth } from "../../hook/auth/use-auth.hook";
import { useBreadcrumb } from "../../hook/layout/use-breadcrumb.hook";

const DiscordVerifyPage = () => {
    useBreadcrumb([Urls.Discord, Urls.DiscordVerify]);

    const { profile } = useAuth();

    if (_.isNull(profile)) {
        return null;
    }

    return <Typography variant={"h1"}>Discord Verifizieren</Typography>;
};

export default DiscordVerifyPage;
