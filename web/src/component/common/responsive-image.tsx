import { Box } from "@mui/material";
import Image, { ImageProps } from "next/image";

/**
 * Ein Next-Image, welches das Seitenverhältnis des Original-Bildes behält.
 */
export const ResponsiveImage = (props: ImageProps) => {
    return (
        <Box sx={{ "& > img": { width: "100%", height: "auto" } }}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image {...props} />
        </Box>
    );
};
