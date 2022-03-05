import React from "react";
import { AuthRequired } from "../component/auth/auth-required/auth-required.component";
import { VerificationCode } from "../component/discord-verification/verification-code.component";

const VerifyPage = () => {
    return (
        <AuthRequired>
            <VerificationCode />
        </AuthRequired>
    );
};

export default VerifyPage;
