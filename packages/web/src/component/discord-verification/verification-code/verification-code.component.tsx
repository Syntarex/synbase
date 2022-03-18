import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

interface IVerificationCodeProps {
    sx?: SxProps<Theme>;
}

export const VerificationCode = (props: IVerificationCodeProps) => {
    const { sx } = props;

    return (
        <Box sx={sx}>
            <Typography variant={"h1"}>Mega cool</Typography>
        </Box>
    );
};
