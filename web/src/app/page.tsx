import { Logo } from "@/component/common/logo";
import { DiscordButton } from "@/component/social/discord-button";
import { orbitron } from "@/style/font";
import { Fade, Stack, Typography } from "@mui/material";
import Image from "next/image";

const Home = () => {
    return (
        <Stack pt={8} pb={4} px={4} alignItems={"center"} gap={8}>
            <Fade in timeout={1000}>
                <Stack direction={"row"} flexWrap={"wrap"} alignItems={"center"} justifyContent={"center"} gap={2}>
                    <Logo size={100} />

                    <Typography variant={"h1"} fontFamily={orbitron.style.fontFamily} fontWeight={600}>
                        Synbase
                    </Typography>
                </Stack>
            </Fade>

            <Fade in timeout={2000}>
                <Stack alignItems={"center"} gap={2}>
                    <Stack direction={"row"} alignItems={"center"} gap={1}>
                        <Typography>Synbase ist Liebe. </Typography>
                        <Image src={"/heart.png"} alt={"Herz"} width={20} height={20} />
                    </Stack>

                    <DiscordButton>Beitreten</DiscordButton>
                </Stack>
            </Fade>
        </Stack>
    );
};

export default Home;
