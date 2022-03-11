import { SxProps } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { IProfile } from "@synbase/shared";
import _ from "lodash";
import React from "react";
import { getMyProfileImage, getProfileImage } from "../../data/profile/profile.selectors";
import { Fetch } from "../common/fetch/fetch.component";
import FileChooser from "../common/file-chooser/file-chooser.component";

interface IProfileAvatarProps {
    sx?: SxProps;
    profile?: IProfile;
    editMode?: boolean;
    onChange?: (file: File | null) => void;
}

export const ProfileAvatar = (props: IProfileAvatarProps) => {
    const { sx, profile, editMode, onChange } = props;

    const [file, setFile] = React.useState<File | null>(null);

    React.useEffect(() => {
        if (!editMode || _.isUndefined(onChange)) {
            return;
        }

        onChange(file);
    }, [file, editMode, onChange]);

    return (
        <Fetch
            onLoaded={(src) => console.log(src)}
            selector={
                _.isUndefined(profile)
                    ? getMyProfileImage({
                          width: 100,
                          height: 100,
                      })
                    : getProfileImage([profile.id, { width: 100, height: 100 }])
            }
        >
            {(src) => (
                <FileChooser sx={sx} disabled={!editMode} onChange={setFile}>
                    <Avatar
                        alt={_.isUndefined(profile) ? "Mein Profilbild" : profile.nickname}
                        src={_.isNull(src) ? undefined : src}
                    />
                </FileChooser>
            )}
        </Fetch>
    );
};
