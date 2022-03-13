import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { ApiResource, ICreateProfile } from "@synbase/shared";
import _ from "lodash";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Urls } from "../../constants/constants.client";
import { useAuth } from "../../hook/auth/use-auth.hook";
import { useSynbase } from "../../hook/client/use-synbase.hook";
import { useBreadcrumb } from "../../hook/layout/use-breadcrumb.hook";

const RegisterPage = () => {
    useBreadcrumb([Urls.Profile, Urls.ProfileRegister]);

    const { profile } = useAuth();

    const router = useRouter();

    React.useEffect(() => {
        if (!_.isNull(profile)) {
            router.push(Urls.Profile.path);
        }
    }, [profile]);

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

    if (!_.isNull(profile)) {
        return null;
    }

    return (
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
    );
};

export default RegisterPage;
