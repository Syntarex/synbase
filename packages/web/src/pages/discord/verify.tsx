import React from "react";
import { AuthRequired } from "../../component/auth/auth-required/auth-required.component";
import { VerificationCode } from "../../component/discord-verification/verification-code/verification-code.component";
import { Urls } from "../../constants/constants.client";
import { useBreadcrumb } from "../../hook/use-breadcrumb.hook";

const DiscordVerifyPage = () => {
    useBreadcrumb([Urls.Discord, Urls.DiscordVerify]);

    return (
        <AuthRequired>
            <VerificationCode />
        </AuthRequired>
    );
};

export default DiscordVerifyPage;
