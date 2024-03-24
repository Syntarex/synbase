import "server-only";

import { ResponsiveImage } from "@/component/common/responsive-image";
import { GameserverCard } from "@/component/gameserver/gameserver-card";
import { CardGrid } from "@/component/layout/card-grid";
import { setBreadcrumb } from "@/data/server/breadcrumb";
import { getEnv } from "@/util/server/env";
import { SiGoogledrive, SiSteam, SiXbox } from "@icons-pack/react-simple-icons";
import { CloudDownload } from "@mui/icons-material";
import { Button, CardActions, CardContent, CardMedia, Stack, SvgIcon, Typography } from "@mui/material";
import { toNumber } from "lodash";

const GameserverPage = async () => {
    await setBreadcrumb({
        path: "/gameserver",
        title: "Game Server",
    });

    return (
        <Stack gap={4}>
            <Typography variant={"h1"}>Game Server</Typography>

            <Typography>Die Synbase hostet einige Game Server, welche öffentlich und völlig kostenlos sind.</Typography>

            <CardGrid>
                <GameserverCard
                    title={"Palworld"}
                    ip={getEnv("PALWORLD_HOST")}
                    port={toNumber(getEnv("PALWORLD_PORT"))}
                    slots={{
                        cardMedia: (
                            <CardMedia>
                                <ResponsiveImage
                                    src={"/palworld.jpg"}
                                    alt={"Palworld Game Server"}
                                    width={900}
                                    height={900}
                                />
                            </CardMedia>
                        ),
                        cardActions: (
                            <CardActions>
                                <Button
                                    href={"https://store.steampowered.com/app/1623730/Palworld"}
                                    target={"_blank"}
                                    startIcon={
                                        <SvgIcon>
                                            <SiSteam
                                                // TODO: Warum muss ich das tun?
                                                onPointerEnterCapture={undefined}
                                                onPointerLeaveCapture={undefined}
                                            />
                                        </SvgIcon>
                                    }
                                >
                                    Steam
                                </Button>

                                <Button
                                    href={"https://www.xbox.com/de-DE/games/store/palworld-game-preview/9nkv34xdw014"}
                                    target={"_blank"}
                                    startIcon={
                                        <SvgIcon>
                                            <SiXbox
                                                onPointerEnterCapture={undefined}
                                                onPointerLeaveCapture={undefined}
                                            />
                                        </SvgIcon>
                                    }
                                >
                                    Xbox
                                </Button>
                            </CardActions>
                        ),
                    }}
                    cardProps={{ sx: { height: "100%" } }}
                >
                    <Stack component={CardContent} flexGrow={1} gap={2}>
                        <Typography>
                            Palworld ist ein Open-World-Survival-Crafting-Spiel, in welchem Pokémon-ähnliche Kreaturen
                            gefangen, genutzt und bekämpft werden.
                        </Typography>

                        <Typography fontWeight={600}>Das Spiel ist kostenlos im Xbox Game Pass verfügbar!</Typography>
                    </Stack>
                </GameserverCard>

                <GameserverCard
                    title={"Clone Hero"}
                    ip={getEnv("CLONEHERO_HOST")}
                    port={toNumber(getEnv("CLONEHERO_PORT"))}
                    slots={{
                        cardMedia: (
                            <CardMedia>
                                <ResponsiveImage
                                    src={"/clonehero.jpg"}
                                    alt={"Clone Hero Game Server"}
                                    width={900}
                                    height={900}
                                />
                            </CardMedia>
                        ),
                        cardActions: (
                            <CardActions>
                                <Button href={"https://clonehero.net"} target={"_blank"} startIcon={<CloudDownload />}>
                                    Herstellerseite
                                </Button>

                                <Button
                                    href={
                                        "https://docs.google.com/spreadsheets/d/13B823ukxdVMocowo1s5XnT3tzciOfruhUVePENKc01o"
                                    }
                                    target={"_blank"}
                                    startIcon={
                                        <SvgIcon>
                                            <SiGoogledrive
                                                onPointerEnterCapture={undefined}
                                                onPointerLeaveCapture={undefined}
                                            />
                                        </SvgIcon>
                                    }
                                >
                                    Songs
                                </Button>
                            </CardActions>
                        ),
                    }}
                    cardProps={{ sx: { height: "100%" } }}
                >
                    <Stack component={CardContent} flexGrow={1} gap={2}>
                        <Typography>
                            Clone Hero ist ein kostenloses Musik-Rhythmus-Spiel, welches Guitar Hero nachempfunden ist.
                            Gitarren-Controller werden unterstützt.
                        </Typography>

                        <Typography fontWeight={600}>Das Spiel ist völlig kostenlos!</Typography>
                    </Stack>
                </GameserverCard>
            </CardGrid>
        </Stack>
    );
};

export default GameserverPage;
