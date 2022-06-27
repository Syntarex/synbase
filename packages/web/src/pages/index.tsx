import { useUser } from "@auth0/nextjs-auth0";
import { Typography } from "@mui/material";
import _ from "lodash";
import { URLS } from "../constants/constants.client";
import { useBreadcrumb } from "../hook/layout/use-breadcrumb.hook";

const IndexPage = () => {
    useBreadcrumb([URLS.HOME]);

    const { user, error, isLoading } = useUser();

    if (isLoading) {
        return <Typography>Es lädt...</Typography>;
    }

    if (!_.isUndefined(error)) {
        return <Typography>{error.message}</Typography>;
    }

    if (_.isUndefined(user)) {
        return (
            <Typography>
                <a href="/api/auth/login">Login</a>
            </Typography>
        );
    }

    return (
        <Typography>
            Willkommen {user.name}! <a href="/api/auth/logout">Logout</a>
        </Typography>
    );
};

export default IndexPage;
