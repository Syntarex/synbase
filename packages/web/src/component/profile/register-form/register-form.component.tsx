import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { ICreateProfile, ProfileConstants } from "@synbase/shared";
import { useFormik } from "formik";
import _ from "lodash";
import React from "react";
import * as yup from "yup";
import { Urls } from "../../../constants/constants.client";

const { NICKNAME_MAX_LENGTH, NICKNAME_MIN_LENGTH, SLUG_MAX_LENGTH, SLUG_MIN_LENGTH, SLUG_REGEX } = ProfileConstants;

const validation = yup.object({
    nickname: yup
        .string()
        .max(NICKNAME_MAX_LENGTH, `Mach mal halblang! Maximale Zeichenanzahl: ${NICKNAME_MAX_LENGTH}`)
        .min(NICKNAME_MIN_LENGTH, `Sprich bitte lauter. Minimale Zeichenanzahl: ${NICKNAME_MIN_LENGTH}`)
        .required("Sag uns wer du bist! :)"),
    slug: yup
        .string()
        .max(SLUG_MAX_LENGTH, `Mach mal halblang! Maximale Zeichenanzahl: ${SLUG_MAX_LENGTH}`)
        .min(SLUG_MIN_LENGTH, `Sprich bitte lauter. Minimale Zeichenanzahl: ${SLUG_MIN_LENGTH}`)
        .required("Schenk mir bitte Beachtung. <3")
        .matches(SLUG_REGEX),
});

interface IRegisterFormProps {
    sx?: SxProps<Theme>;
    disabled?: boolean;
    onSubmit: (data: ICreateProfile) => void;
}

const RegisterForm = (props: IRegisterFormProps) => {
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
                        Über diesen Link ist dein Profil zukünftig erreichbar: {Urls.Profile(values).path}
                    </FormHelperText>
                </FormControl>

                <Button type={"submit"} variant={"contained"} disabled={disabled}>
                    Los geht&apos;s!
                </Button>
            </Stack>
        </form>
    );
};

export default RegisterForm;
