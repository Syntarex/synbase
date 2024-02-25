import "server-only";

import { orbitron } from "@/style/font";
import { Stack, SxProps, Typography, TypographyProps } from "@mui/material";
import Image from "next/image";

interface LogoProps {
    sx?: SxProps;
    variant?: TypographyProps["variant"];
    imgSize?: number /** px */;
}

export const Logo = ({ sx, variant = "h4", imgSize = 50 }: LogoProps) => {
    return (
        <Stack sx={sx} direction={"row"} flexWrap={"wrap"} alignItems={"center"} justifyContent={"center"} gap={4}>
            <Image src={"/logo.svg"} alt={"Synbase"} width={imgSize} height={imgSize} />

            <Typography variant={variant} fontFamily={orbitron.style.fontFamily} fontWeight={800}>
                Synbase
            </Typography>
        </Stack>
    );
};
