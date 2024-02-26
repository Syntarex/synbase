import { Logo } from "@/component/common/logo";
import { DiscordButton } from "@/component/social/discord-button";
import { orbitron } from "@/style/font";
import { getEnv } from "@/util/env";
import { Fade, Stack, Typography } from "@mui/material";
import Image from "next/image";

const Home = () => {
    return (
        <Stack pt={8} pb={4} px={4} alignItems={"center"} spacing={8}>
            <Fade in timeout={1000}>
                <Stack direction={"row"} flexWrap={"wrap"} alignItems={"center"} justifyContent={"center"} spacing={2}>
                    <Logo size={100} />

                    <Typography variant={"h1"} fontFamily={orbitron.style.fontFamily} fontWeight={600}>
                        Synbase
                    </Typography>
                </Stack>
            </Fade>

            <Fade in timeout={2000}>
                <Stack alignItems={"center"} spacing={2}>
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                        <Typography>Trete dem Synbase Discord bei und werde glücklich. </Typography>
                        <Image src={"/heart.png"} alt={"Herz"} width={20} height={20} />
                    </Stack>

                    <DiscordButton href={getEnv<string>("DISCORD_URL")}>Beitreten</DiscordButton>
                </Stack>
            </Fade>
        </Stack>
    );
};

export default Home;
