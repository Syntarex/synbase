import { Logo } from "@/component/common/logo";
import { DiscordButton } from "@/component/social/discord-button";
import { GithubButton } from "@/component/social/github-button";
import "@/style/font";
import { Box, Fade, Stack, Typography } from "@mui/material";
import { NextPage } from "next";

const Home: NextPage = () => {
    return (
        <Stack height={"100vh"} pt={12} pb={4} px={4} alignItems={"center"} gap={8}>
            <Fade in timeout={1000}>
                <Logo variant={"h1"} imgSize={150} />
            </Fade>

            <Fade in timeout={2000}>
                <Stack height={"100%"} alignItems={"center"} flexGrow={1} gap={2}>
                    <Typography>Trete dem Synbase Discord bei und werde glücklich.</Typography>

                    <DiscordButton>Beitreten</DiscordButton>
                </Stack>
            </Fade>

            <Box>
                <GithubButton />
            </Box>
        </Stack>
    );
};

export default Home;
