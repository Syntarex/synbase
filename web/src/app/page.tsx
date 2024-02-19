"use client";

import { DiscordButton } from "@/component/social/discord-button";
import { GithubButton } from "@/component/social/github-button";
import { Box, Fade, Stack, Typography } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { useIntervalWhen } from "rooks";

const Home: NextPage = () => {
    const [animated, setAnimated] = useState(0);

    useIntervalWhen(() => setAnimated(animated + 1), 1000, animated < 4);

    return (
        <Stack sx={{ height: "60vh" }} alignItems={"center"} justifyContent={"center"} spacing={8}>
            <Fade in={animated >= 0} timeout={2000}>
                <Image src={"/logo.svg"} alt={"Synbase"} width={200} height={200} />
            </Fade>

            <Fade in={animated >= 1} timeout={2000}>
                <Stack alignItems={"center"} spacing={2}>
                    <Typography>Trete dem Synbase Discord bei und werde glücklich.</Typography>

                    <DiscordButton />
                </Stack>
            </Fade>

            <Fade in={animated >= 2} timeout={2000}>
                <Box>
                    <GithubButton />
                </Box>
            </Fade>
        </Stack>
    );
};

export default Home;
