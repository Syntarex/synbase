import Typography from "@mui/material/Typography";
import React from "react";
import { Urls } from "../../constants/constants.client";
import { useBreadcrumb } from "../../hook/layout/use-breadcrumb.hook";

const DiscordServerPage = () => {
    useBreadcrumb([Urls.Discord, Urls.DiscordServer]);

    return <Typography variant={"h1"}>Discord Server</Typography>;
};

export default DiscordServerPage;
