import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { IProfile } from "@synbase/shared";
import dayjs from "dayjs";
import React from "react";
import ProfileAvatar from "../profile-avatar/profile-avatar.component";

interface IProfileItemProps {
    sx?: SxProps<Theme>;
    profile: IProfile;
    onImageChange?: (file: File | null) => void;
}

const ProfileItem = (props: IProfileItemProps) => {
    const { sx, profile, onImageChange } = props;

    const { created, nickname } = profile;

    return (
        <Paper
            sx={{
                padding: (theme) => theme.spacing(2),
                ...sx,
            }}
        >
            <Grid
                container
                sx={{
                    alignItems: "center",
                }}
                spacing={2}
            >
                <Grid item xs={"auto"}>
                    <ProfileAvatar profile={profile} onChange={onImageChange} />
                </Grid>
                <Grid item xs={true}>
                    <Stack>
                        <Typography>{nickname}</Typography>
                        <Typography variant={"subtitle2"}>
                            Mitglied seit {dayjs(created).format("MMMM YYYY")}
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ProfileItem;
