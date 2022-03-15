import { SxProps } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { ApiResource, ICreateProfile } from "@synbase/shared";
import { useFormik } from "formik";
import _ from "lodash";
import React from "react";
import * as yup from "yup";
import { ClientEnv } from "../../../constants/constants.client";

/* TODO: Validierungs-Werte in shared auslagern und hier verwenden */
const validation = yup.object({
    nickname: yup.string().max(100, "Maximum 100 Zeichen").min(3, "Minimum 3 Zeichen").required("Wichtig! AUSFÜLLEN!"),
    slug: yup
        .string()
        .max(100, "Maximum 100 Zeichen")
        .min(3, "Minimum 3 Zeichen")
        .required("Wichtig! AUSFÜLLEN")
        .matches(new RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$")),
});

interface IProfileCreateFormProps {
    sx?: SxProps;
    disabled?: boolean;
    onSubmit: (data: ICreateProfile) => void;
}

const ProfileCreateForm = (props: IProfileCreateFormProps) => {
    const { sx, disabled, onSubmit } = props;

    const { handleSubmit, values, handleChange, errors, touched } = useFormik<ICreateProfile>({
        initialValues: {
            nickname: "",
            slug: "",
        },
        validationSchema: validation,
        onSubmit,
    });

    return (
        <form onSubmit={handleSubmit}>
            <Stack sx={sx} spacing={2}>
                <TextField
                    name={"nickname" as keyof ICreateProfile}
                    label={"Nickname"}
                    disabled={disabled}
                    variant={"outlined"}
                    value={values.nickname}
                    onChange={handleChange}
                    error={touched.nickname && !_.isUndefined(errors.nickname)}
                    helperText={touched.nickname && errors.nickname}
                />

                <FormControl>
                    <TextField
                        name={"slug" as keyof ICreateProfile}
                        label={"Slug"}
                        disabled={disabled}
                        variant={"outlined"}
                        value={values.slug}
                        onChange={handleChange}
                        error={touched.slug && !_.isUndefined(errors.slug)}
                        helperText={touched.slug && errors.slug}
                    />
                    <FormHelperText>
                        Über diesen Link ist dein Profil zukünftig erreichbar: {ClientEnv.webUrl}/{ApiResource.Profile}/
                        {values.slug}
                    </FormHelperText>
                </FormControl>

                <Button type={"submit"} variant={"contained"} disabled={disabled}>
                    Los geht&apos;s!
                </Button>
            </Stack>
        </form>
    );
};

export default ProfileCreateForm;
