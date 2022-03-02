import Typography from "@mui/material/Typography";
import React from "react";
import { ensureMyDiscordVerification } from "../../data/discord-verification/discord-verification.selectors";
import { Fetch } from "../common/fetch.component";

interface IVerificationCodeProps {
    className?: string;
}

export const VerificationCode = (props: IVerificationCodeProps) => {
    const { className } = props;

    return (
        <div className={className}>
            <Fetch selector={ensureMyDiscordVerification}>
                {(result) => <Typography>{result.verificationCode}</Typography>}
            </Fetch>
        </div>
    );
};
