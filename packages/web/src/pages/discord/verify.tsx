import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import { GetServerSideProps } from "next";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { getSynbase } from "../../client/server.client";
import { Fetch } from "../../component/common/fetch/fetch.component";
import { Urls } from "../../constants/constants.client";
import { ensureMyDiscordVerification } from "../../data/discord-verification/discord-verification.queries";
import { useAuth } from "../../hook/auth/use-auth.hook";
import { useSynbase } from "../../hook/client/use-synbase.hook";
import { useBreadcrumb } from "../../hook/layout/use-breadcrumb.hook";
import { IWithDehydratedState } from "../../model/page-props.model";

const DiscordVerifyPage = () => {
    useBreadcrumb([Urls.Discord, Urls.DiscordVerify]);

    const { profile } = useAuth();

    const synbase = useSynbase();

    const query = React.useMemo(() => ensureMyDiscordVerification(synbase), [synbase]);

    if (_.isNull(profile)) {
        return null;
    }

    return (
        <Stack>
            <Typography variant={"h1"}>Discord Verifizieren</Typography>

            <Fetch
                selector={query}
                renderOnSuccess={(discordVerification) => (
                    <Typography>{discordVerification.verificationCode}</Typography>
                )}
            />
        </Stack>
    );
};

export const getServerSideProps: GetServerSideProps<IWithDehydratedState> = async (ctx) => {
    const synbase = await getSynbase(ctx);
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(ensureMyDiscordVerification(synbase));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default DiscordVerifyPage;
