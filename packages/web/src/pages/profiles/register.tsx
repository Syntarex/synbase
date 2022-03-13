import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { ApiResource, ICreateProfile } from "@synbase/shared";
import _ from "lodash";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Fetch } from "../../component/common/fetch/fetch.component";
import { Urls } from "../../constants/constants.client";
import { useSynbase } from "../../hook/client/use-synbase.hook";
import { useBreadcrumb } from "../../hook/layout/use-breadcrumb.hook";
import { useRedirect } from "../../hook/use-redirect.hook";

const RegisterPage = () => {
    useBreadcrumb([Urls.Profile, Urls.ProfileRegister]);

    const redirect = useRedirect();

    const synbase = useSynbase();
    const queryClient = useQueryClient();

    const { mutate: createProfile, isLoading } = useMutation(
        async (body: ICreateProfile) => {
            return synbase.profiles.createMy(body);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ApiResource.Profile, "my"]);
            },
        },
    );

    return (
        <Fetch
            selector={{
                queryKey: [ApiResource.Profile, "my"],
                queryFn: () => synbase.profiles.getMy(),
            }}
            onSuccess={(profile) => (!_.isNull(profile) ? redirect(Urls.Profile) : undefined)}
            renderOnSuccess={(profile) =>
                !_.isNull(profile) ? null : (
                    <Stack>
                        <Button
                            disabled={isLoading}
                            onClick={() =>
                                createProfile({
                                    nickname: "Syntarex",
                                    slug: "syntarex",
                                })
                            }
                        >
                            Registrieren
                        </Button>
                    </Stack>
                )
            }
        />
    );
};

export default RegisterPage;
