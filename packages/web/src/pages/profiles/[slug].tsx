import Typography from "@mui/material/Typography";
import { IProfile } from "@synbase/shared";
import _ from "lodash";
import { useRouter } from "next/router";
import React from "react";
import { Fetch } from "../../component/common/fetch/fetch.component";
import { Urls } from "../../constants/constants.client";
import { getProfileBySlug } from "../../data/profile/profile.selectors";
import { useBreadcrumb } from "../../hook/layout/use-breadcrumb.hook";

const ProfilePage = () => {
    useBreadcrumb([Urls.Profile]);

    const router = useRouter();

    const { slug } = router.query;

    const redirectTo404 = React.useCallback(() => {
        router.push("/404");
    }, [router]);

    const onProfileLoaded = React.useCallback(
        (profile: IProfile | null) => {
            if (_.isNull(profile)) {
                redirectTo404();
                return;
            }
        },
        [redirectTo404],
    );

    if (_.isUndefined(slug) || _.isArray(slug)) {
        redirectTo404();
        return null;
    }

    return (
        <Fetch selector={getProfileBySlug(slug)} onLoaded={onProfileLoaded}>
            {(profile) => (_.isNull(profile) ? null : <Typography variant={"h1"}>{profile.nickname}</Typography>)}
        </Fetch>
    );
};

export default ProfilePage;
