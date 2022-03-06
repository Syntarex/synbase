import React from "react";
import { AuthRequired } from "../../component/auth/auth-required/auth-required.component";

const MyProfilePage = () => {
    return (
        <AuthRequired>
            <div>Eigenes Profile!</div>
        </AuthRequired>
    );
};

export default MyProfilePage;
