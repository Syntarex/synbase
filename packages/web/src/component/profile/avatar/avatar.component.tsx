import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import MuiAvatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { IProfile } from "@synbase/shared";
import _ from "lodash";
import React from "react";
import { useSynbase } from "../../../hook/client/use-synbase.hook";
import FileChooser from "../../common/file-chooser/file-chooser.component";

interface IAvatarProps {
    sx?: SxProps<Theme>;
    profile: IProfile;
    onChange?: (file: File | null) => void;
}

const Avatar = (props: IAvatarProps) => {
    const { sx, profile, onChange } = props;

    const { imageId } = profile;

    const synbase = useSynbase();

    const [file, setFile] = React.useState<File | null>(null);

    React.useEffect(() => {
        if (_.isUndefined(onChange)) {
            return;
        }

        onChange(file);
    }, [file, onChange]);

    const { nickname } = profile;

    return (
        <FileChooser sx={sx} disabled={_.isUndefined(onChange)} onChange={setFile}>
            <Tooltip open={_.isUndefined(onChange) ? false : undefined} title={"Klicke zum Bearbeiten"}>
                <MuiAvatar
                    alt={nickname}
                    src={_.isNull(imageId) ? undefined : synbase.images.getImageUrl(imageId, { height: 64, width: 64 })}
                    sx={{
                        width: 64,
                        height: 64,
                    }}
                >
                    {nickname.charAt(0)}
                </MuiAvatar>
            </Tooltip>
        </FileChooser>
    );
};

export default Avatar;
