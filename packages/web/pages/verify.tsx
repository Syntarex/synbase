import React from "react";
import { AuthRequired } from "../src/component/auth/auth-required/auth-required.component";
import { VerificationCode } from "../src/component/discord-verification/verification-code.component";

const VerifyPage = () => {
    return (
        <AuthRequired>
            <VerificationCode />
        </AuthRequired>
    );
};

export default VerifyPage;
