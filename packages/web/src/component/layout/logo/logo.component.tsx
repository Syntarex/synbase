import Box from "@mui/material/Box";
import Image from "next/image";
import React from "react";
import ImageData from "../../../../public/logo.png";

interface ILogoProps {
    width: number;
    height: number;
}

export const Logo = (props: ILogoProps) => {
    const { width, height } = props;

    return (
        <Box sx={{ width, height }}>
            <Image src={ImageData} {...props} />
        </Box>
    );
};
