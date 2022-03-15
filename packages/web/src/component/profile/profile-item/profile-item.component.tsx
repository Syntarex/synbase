import { SxProps } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { IProfile } from "@synbase/shared";
import dayjs from "dayjs";
import _ from "lodash";
import React from "react";
import { useSynbase } from "../../../hook/client/use-synbase.hook";
import ProfileAvatar from "../profile-avatar/profile-avatar.component";

interface IProfileItemProps {
    sx?: SxProps;
    profile: IProfile;
    onImageChange?: (file: File | null) => void;
}

const ProfileItem = (props: IProfileItemProps) => {
    const { sx, profile, onImageChange } = props;

    const synbase = useSynbase();

    const { created, imageId, nickname } = profile;

    return (
        <Paper
            sx={{
                padding: (theme) => theme.spacing(2),
                ...sx,
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={"auto"}>
                    <ProfileAvatar
                        containerSx={{
                            display: "flex",
                            justifyContent: {
                                xs: "center",
                                sm: "inherit",
                            },
                        }}
                        avatarSx={{
                            width: {
                                xs: 112,
                                sm: 56,
                            },
                            height: {
                                xs: 112,
                                sm: 56,
                            },
                        }}
                        editMode={!_.isUndefined(onImageChange)}
                        src={_.isNull(imageId) ? undefined : synbase.images.getImageUrl(imageId)}
                        profile={profile}
                        onChange={onImageChange}
                    />
                </Grid>
                <Grid item xs={12} sm={true}>
                    <Stack
                        sx={{
                            alignItems: {
                                xs: "center",
                                sm: "inherit",
                            },
                        }}
                    >
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
