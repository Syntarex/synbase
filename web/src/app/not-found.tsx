import "server-only";

import { Logo } from "@/component/common/logo";
import { orbitron } from "@/style/font";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";

const notFound = () => {
    return (
        <Stack alignItems={"center"} gap={4}>
            <Stack direction={"row"} alignItems={"center"} gap={4}>
                <Logo size={100} />

                <Typography variant={"h1"} fontFamily={orbitron.style.fontFamily} fontWeight={800}>
                    404
                </Typography>
            </Stack>

            <Typography>Diese Seite existiert noch nicht.</Typography>

            <Image src={"/heart.png"} alt={"Herz"} width={30} height={30} />
        </Stack>
    );
};

export default notFound;
