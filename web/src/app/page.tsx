import { SiDiscord, SiGithub } from "@icons-pack/react-simple-icons";
import { Button, Stack, SvgIcon, Typography } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
    return (
        <Stack sx={{ height: "60vh" }} alignItems={"center"} justifyContent={"center"} spacing={8}>
            <Image src={"/logo.svg"} alt={"Synbase"} width={200} height={200} />

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
        </Stack>
    );
};

export default Home;
