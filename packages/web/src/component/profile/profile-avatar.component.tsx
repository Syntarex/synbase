import { SxProps } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { IProfile } from "@synbase/shared";
import _ from "lodash";
import React from "react";
import FileChooser from "../common/file-chooser/file-chooser.component";

interface IProfileAvatarProps {
    sx?: SxProps;
    profile: IProfile;
    src?: string | null;
    editMode?: boolean;
    onChange?: (file: File | null) => void;
}

const ProfileAvatar = (props: IProfileAvatarProps) => {
    const { sx, profile, editMode, onChange, src } = props;

    const [file, setFile] = React.useState<File | null>(null);

    React.useEffect(() => {
        if (!editMode || _.isUndefined(onChange)) {
            return;
        }

        onChange(file);
    }, [file, editMode, onChange]);

    return (
        <FileChooser sx={sx} disabled={!editMode} onChange={setFile}>
            <Avatar alt={profile.nickname} src={_.isNull(src) ? undefined : src} />
        </FileChooser>
    );
};

export default ProfileAvatar;
