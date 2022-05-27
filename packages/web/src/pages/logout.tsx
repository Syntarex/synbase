import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import { useRouter } from "next/router";
import React from "react";
import Link from "../component/common/link/link.component";
import { Urls } from "../constants/constants.client";
import { useAuth } from "../hook/auth/use-auth.hook";
import { useBreadcrumb } from "../hook/layout/use-breadcrumb.hook";
import { signOut } from "../util/sign-out.util";

const LogoutPage = () => {
    useBreadcrumb([Urls.Logout]);

    const { session } = useAuth({ redirectEnabled: false });

    const router = useRouter();

    const isAutoLogout = React.useMemo(() => _.isEqual(router.query.auto, "true"), [router]);

    React.useEffect(() => {
        if (!_.isNull(session)) {
            signOut();
            return;
        }
    }, [session]);

    return (
        <Stack spacing={2}>
            <Typography variant={"h3"}>Schönen Tag noch!</Typography>
            <Typography>
                Du wurdest {isAutoLogout ? "automatisch " : ""}ausgeloggt
                {isAutoLogout ? ", da du zulange inaktiv warst" : ""}.
            </Typography>
            <Typography variant={"body2"}>
                <Link href={Urls.Home}> Zurück zur Startseite</Link>
            </Typography>
        </Stack>
    );
};

export default LogoutPage;
