import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import React from "react";
import { Logo } from "../component/layout/logo/logo.component";

const Custom404Page = () => {
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
                Die{" "}
                <NextLink passHref href={"/"}>
                    <Link>Startseite</Link>
                </NextLink>{" "}
                hilft dir sicher weiter.
            </Typography>
        </Stack>
    );
};

export default Custom404Page;
