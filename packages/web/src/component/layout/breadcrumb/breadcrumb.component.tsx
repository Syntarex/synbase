import { Theme } from "@emotion/react";
import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, SxProps } from "@mui/material";
import _ from "lodash";
import { useRecoilValue } from "recoil";
import { URLS } from "../../../constants/constants.client";
import { breadcrumbAtom } from "../../../data/layout/breadcrumb.atoms";
import Link from "../../common/link/link.component";

interface IBreadcrumbProps {
    sx?: SxProps<Theme>;
}

/* TODO: Sieht am Handy schrecklich aus */
const Breadcrumb = (props: IBreadcrumbProps) => {
    const { sx } = props;

    const breadcrumb = useRecoilValue(breadcrumbAtom);

    return (
        <Breadcrumbs sx={sx} separator={<NavigateNext fontSize="small" />}>
            {_.isEmpty(breadcrumb) ? (
                <Link href={URLS.HOME} />
            ) : (
                breadcrumb.map((element, index) => {
                    const last = _.isEqual(index, breadcrumb.length - 1);

                    return <Link key={`breadcrumb-${index}`} href={element} color={last ? undefined : "white"} />;
                })
            )}
        </Breadcrumbs>
    );
};

export default Breadcrumb;
