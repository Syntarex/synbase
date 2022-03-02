import Typography from "@mui/material/Typography";
import React from "react";
import { AuthRequired } from "../src/component/auth/auth-required/auth-required.component";
import { Fetch } from "../src/component/common/fetch.component";
import { ensureMyDiscordVerification } from "../src/data/discord-verification/discord-verification.selectors";

const VerifyPage = () => {
    return (
        <AuthRequired>
            <Fetch selector={ensureMyDiscordVerification}>
                {(discordVerification) => <Typography>{JSON.stringify(discordVerification)}</Typography>}
            </Fetch>
        </AuthRequired>
    );
};

export default VerifyPage;
