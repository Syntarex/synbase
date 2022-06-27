import { Stack, Typography } from "@mui/material";
import Link from "../component/common/link/link.component";
import Logo from "../component/layout/logo/logo.component";
import { URLS } from "../constants/constants.client";
import { useBreadcrumb } from "../hook/layout/use-breadcrumb.hook";

const Custom404Page = () => {
    useBreadcrumb([URLS.NOT_FOUND]);

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
                Die <Link href={URLS.HOME}>Startseite</Link> hilft dir sicher weiter.
            </Typography>
        </Stack>
    );
};

export default Custom404Page;
