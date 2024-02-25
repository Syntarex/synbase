import "server-only";

import { Box, BoxProps } from "@mui/material";
import Image from "next/image";

interface LogoProps {
    size?: number /** px */;
    boxProps?: BoxProps;
}

export const Logo = ({ size = 50, boxProps }: LogoProps) => {
    return (
        <Box width={size} height={size} {...boxProps}>
            <Image src={"/logo.svg"} alt={"Synbase"} width={size} height={size} />
        </Box>
    );
};
