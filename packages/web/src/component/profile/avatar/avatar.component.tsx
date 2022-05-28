import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import MuiAvatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { IProfile } from "@synbase/shared";
import _ from "lodash";
import React from "react";
import { useSynbase } from "../../../hook/client/use-synbase.hook";
import FileChooser from "../../common/file-chooser/file-chooser.component";

export enum AvatarSize {
    Small = 1,
    Medium = 2,
    Big = 3,
}

interface IAvatarProps {
    sx?: SxProps<Theme>;
    profile: IProfile;
    onChange?: (file: File | null) => void;
    size?: AvatarSize;
}

const Avatar = (props: IAvatarProps) => {
    const { sx, profile, onChange, size } = props;

    const { imageId } = profile;

    const synbase = useSynbase();

    const [file, setFile] = React.useState<File | null>(null);

    React.useEffect(() => {
        if (_.isUndefined(onChange)) {
            return;
        }

        onChange(file);
    }, [file, onChange]);

    const sizeStyle: { width: number; height: number } = React.useMemo(() => {
        if (_.isUndefined(size)) {
            return {
                width: 48,
                height: 48,
            };
        }

        switch (size) {
            case AvatarSize.Small:
                return {
                    width: 32,
                    height: 32,
                };
            case AvatarSize.Medium:
                return {
                    width: 48,
                    height: 48,
                };
            case AvatarSize.Big:
                return {
                    width: 64,
                    height: 64,
                };
        }
    }, [size]);

    const { nickname } = profile;

    return (
        <FileChooser sx={sx} disabled={_.isUndefined(onChange)} onChange={setFile}>
            <Tooltip
                open={_.isUndefined(onChange) ? false : undefined}
                title={_.isUndefined(onChange) ? nickname : "Klicke zum Bearbeiten"}
            >
                <MuiAvatar
                    alt={nickname}
                    src={_.isNull(imageId) ? undefined : synbase.images.getImageUrl(imageId, sizeStyle)}
                    sx={sizeStyle}
                >
                    {nickname.charAt(0)}
                </MuiAvatar>
            </Tooltip>
        </FileChooser>
    );
};

export default Avatar;
