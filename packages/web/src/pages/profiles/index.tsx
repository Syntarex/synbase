import Stack from "@mui/material/Stack";
import _ from "lodash";
import React from "react";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { browserClient } from "../../client/browser.client";
import { AuthRequired } from "../../component/auth/auth-required/auth-required.component";
import { Fetch } from "../../component/common/fetch/fetch.component";
import { ProfileAvatar } from "../../component/profile/profile-avatar.component";
import { Urls } from "../../constants/constants.client";
import { getMyProfile, getMyProfileImage } from "../../data/profile/profile.selectors";
import { useBreadcrumb } from "../../hook/use-breadcrumb.hook";

const MyProfilePage = () => {
    useBreadcrumb([Urls.Profile]);

    const refreshImage = useRecoilRefresher_UNSTABLE(getMyProfileImage);

    const onImageChange = React.useCallback((file: File | null) => {
        if (_.isNull(file)) {
            /* TODO: BILD LÖSCHEN! */
            return;
        }

        browserClient.profiles.uploadMyImage(file).then(() => refreshImage());
    }, []);

    return (
        <AuthRequired>
            <Fetch selector={getMyProfile}>
                {(profile) =>
                    _.isNull(profile) ? null : (
                        <Stack>
                            <ProfileAvatar
                                sx={{
                                    width: 300,
                                    height: 300,
                                }}
                                editMode={true}
                                onChange={onImageChange}
                            />
                        </Stack>
                    )
                }
            </Fetch>
        </AuthRequired>
    );
};

export default MyProfilePage;
