import "server-only";

import { CardGrid } from "@/component/common/card-grid";
import { GameserverCard } from "@/component/gameserver/gameserver-card";
import { getEnv } from "@/util/server/env";
import { CardContent, Stack, Typography } from "@mui/material";
import { toNumber } from "lodash";

const GameserverPage = async () => {
    return (
        <Stack gap={2}>
            <Typography variant={"h1"}>Game Server</Typography>

            <CardGrid>
                <GameserverCard
                    title={"Palworld"}
                    ip={getEnv("PALWORLD_HOST")}
                    port={toNumber(getEnv("PALWORLD_PORT"))}
                >
                    <CardContent>Das ist der Palworld-Server</CardContent>
                </GameserverCard>
            </CardGrid>
        </Stack>
    );
};

export default GameserverPage;
