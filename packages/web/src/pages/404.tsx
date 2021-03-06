import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import Link from "../component/common/link/link.component";
import Logo from "../component/layout/logo/logo.component";
import { Urls } from "../constants/constants.client";
import { useBreadcrumb } from "../hook/layout/use-breadcrumb.hook";

const Custom404Page = () => {
    useBreadcrumb([Urls.NotFound]);

    return (
        <Stack spacing={2} alignItems={"center"}>
            <Stack spacing={2} direction={"row"} alignItems={"center"}>
                <Logo width={120} height={120} />

                <Typography variant={"h1"} fontWeight={500}>
                    404
                </Typography>
            </Stack>

            <Typography>Die gesuchte Seite konnte nicht gefunden werden.</Typography>

            <Typography variant={"body2"}>
                Die <Link href={Urls.Home}>Startseite</Link> hilft dir sicher weiter.
            </Typography>
        </Stack>
    );
};

export default Custom404Page;
