import "server-only";

import { SongList } from "@/component/clonehero/song-list";
import { Stack, Typography } from "@mui/material";

const AdminCloneHeroPage = async () => {
    return (
        <Stack spacing={2}>
            <Typography variant={"h1"}>Clone Hero Songs</Typography>

            <SongList />
        </Stack>
    );
};

export default AdminCloneHeroPage;
