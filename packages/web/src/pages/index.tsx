import AuthButton from "../component/auth/auth-button/auth-button.component";
import { URLS } from "../constants/constants.client";
import { useBreadcrumb } from "../hook/layout/use-breadcrumb.hook";

const IndexPage = () => {
    useBreadcrumb([URLS.HOME]);

    return <AuthButton />;
};

export default IndexPage;
