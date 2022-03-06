import Typography from "@mui/material/Typography";
import React from "react";
import { AuthRequired } from "../../component/auth/auth-required/auth-required.component";
import { Urls } from "../../constants/constants.client";
import { useBreadcrumb } from "../../hook/use-breadcrumb.hook";

const RegisterPage = () => {
    useBreadcrumb([Urls.Profile]);

    return (
        <AuthRequired>
            <Typography variant={"h1"}>Registrieren!</Typography>
        </AuthRequired>
    );
};

export default RegisterPage;
