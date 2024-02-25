import { Logo } from "@/component/common/logo";
import { DiscordButton } from "@/component/social/discord-button";
import { GithubButton } from "@/component/social/github-button";
import "@/style/font";
import { orbitron } from "@/style/font";
import { getEnv } from "@/util/env";
import { Box, Fade, Stack, Typography } from "@mui/material";
import { NextPage } from "next";

const Home: NextPage = () => {
    return (
        <Stack height={"100vh"} pt={12} pb={4} px={4} alignItems={"center"} gap={8}>
            <Fade in timeout={1000}>
                <Stack direction={"row"} flexWrap={"wrap"} alignItems={"center"} justifyContent={"center"} gap={4}>
                    <Logo size={150} />

                    <Typography variant={"h1"} fontFamily={orbitron.style.fontFamily} fontWeight={800}>
                        Synbase
                    </Typography>
                </Stack>
            </Fade>

            <Fade in timeout={2000}>
                <Stack height={"100%"} alignItems={"center"} flexGrow={1} gap={2}>
                    <Typography>Trete dem Synbase Discord bei und werde glücklich.</Typography>

                    <DiscordButton href={getEnv<string>("DISCORD_URL")}>Beitreten</DiscordButton>
                </Stack>
            </Fade>

            <Box>
                <GithubButton />
            </Box>
        </Stack>
    );
};

export default Home;
