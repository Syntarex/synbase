import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { IProfile } from "@synbase/shared";
import _ from "lodash";
import React from "react";
import FileChooser from "../../common/file-chooser/file-chooser.component";

interface IProfileAvatarProps {
    containerSx?: SxProps<Theme>;
    avatarSx?: SxProps<Theme>;
    profile: IProfile;
    src?: string | null;
    onChange?: (file: File | null) => void;
}

const ProfileAvatar = (props: IProfileAvatarProps) => {
    const { containerSx, avatarSx, profile, onChange, src } = props;

    const [file, setFile] = React.useState<File | null>(null);

    React.useEffect(() => {
        if (_.isUndefined(onChange)) {
            return;
        }

        onChange(file);
    }, [file, onChange]);

    const { nickname } = profile;

    return (
        <FileChooser sx={containerSx} disabled={_.isUndefined(onChange)} onChange={setFile}>
            <Tooltip open={_.isUndefined(onChange) ? false : undefined} title={"Klicke zum Bearbeiten"}>
                <Avatar alt={nickname} src={_.isNull(src) ? undefined : src} sx={avatarSx}>
                    {nickname.charAt(0)}
                </Avatar>
            </Tooltip>
        </FileChooser>
    );
};

export default ProfileAvatar;
