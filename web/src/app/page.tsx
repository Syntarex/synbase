"use client";

import { SiDiscord, SiGithub } from "@icons-pack/react-simple-icons";
import { Button, Fade, Stack, SvgIcon, Typography } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useIntervalWhen } from "rooks";

const Home: NextPage = () => {
    const [animated, setAnimated] = useState(0);

    useIntervalWhen(() => setAnimated(animated + 1), 750, animated < 2);

    return (
        <Stack sx={{ height: "60vh" }} alignItems={"center"} justifyContent={"center"} spacing={8}>
            <Fade in={animated >= 0} timeout={2000}>
                <Image src={"/logo.svg"} alt={"Synbase"} width={200} height={200} />
            </Fade>

            <Fade in={animated >= 1} timeout={2000}>
                <Stack alignItems={"center"} spacing={2}>
                    <Typography>Trete dem Synbase Discord bei und werde glücklich.</Typography>

                    <Link href={"https://discord.gg/RKNAJgkqyW"}>
                        <Button
                            variant={"contained"}
                            startIcon={
                                <SvgIcon>
                                    <SiDiscord />
                                </SvgIcon>
                            }
                            color={"discord" as "inherit"} // TODO: https://mui.com/material-ui/customization/palette/#typescript 🥲
                        >
                            Beitreten
                        </Button>
                    </Link>
                </Stack>
            </Fade>

            <Fade in={animated >= 2} timeout={2000}>
                <Link href={"https://github.com/Syntarex/synbase"} target={"_blank"}>
                    <Button
                        variant={"text"}
                        startIcon={
                            <SvgIcon>
                                <SiGithub />
                            </SvgIcon>
                        }
                        size={"small"}
                    >
                        Open Source auf GitHub
                    </Button>
                </Link>
            </Fade>
        </Stack>
    );
};

export default Home;
