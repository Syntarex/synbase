import { Typography } from "@mui/material";
import { URLS } from "../constants/constants.client";
import { useBreadcrumb } from "../hook/layout/use-breadcrumb.hook";

const IndexPage = () => {
    useBreadcrumb([URLS.HOME]);

    return <Typography>Willkommen</Typography>;
};

export default IndexPage;
