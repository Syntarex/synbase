import { SxProps } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import React from "react";
import { ensureMyDiscordVerification } from "../../../data/discord-verification/discord-verification.selectors";
import { Fetch } from "../../common/fetch/fetch.component";

interface IVerificationCodeProps {
    sx?: SxProps;
}

export const VerificationCode = (props: IVerificationCodeProps) => {
    const { sx } = props;

    return (
        <Box sx={sx}>
            <Fetch selector={ensureMyDiscordVerification}>
                {(result) => <Typography>{result.verificationCode}</Typography>}
            </Fetch>
        </Box>
    );
};
