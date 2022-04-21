import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { BlogItemFormat, BlogItemValidation, ICreateBlogItem } from "@synbase/shared";
import { useFormik } from "formik";
import _ from "lodash";
import React from "react";
import { Urls } from "../../../constants/constants.client";

interface INewBlogItemFormProps {
    sx?: SxProps<Theme>;
    disabled?: boolean;
    onSubmit: (data: ICreateBlogItem) => void;
}

const NewBlogItemForm = (props: INewBlogItemFormProps) => {
    const { sx, disabled, onSubmit } = props;

    const { handleSubmit, values, handleChange, errors, touched } = useFormik<ICreateBlogItem>({
        initialValues: {
            content: "",
            format: BlogItemFormat.MARKDOWN,
            isDraft: true,
            slug: "",
            summary: "",
            title: "",
        },
        validationSchema: BlogItemValidation,
        onSubmit,
    });

    return (
        <form onSubmit={handleSubmit}>
            <Stack sx={sx} spacing={2}>
                <TextField
                    name={"title" as keyof ICreateBlogItem}
                    label={"Titel"}
                    disabled={disabled}
                    variant={"outlined"}
                    value={values.title}
                    onChange={handleChange}
                    error={touched.title && !_.isUndefined(errors.title)}
                    helperText={touched.title && errors.title}
                />

                <TextField
                    name={"summary" as keyof ICreateBlogItem}
                    label={"Zusammenfassung"}
                    disabled={disabled}
                    variant={"outlined"}
                    value={values.summary}
                    onChange={handleChange}
                    error={touched.summary && !_.isUndefined(errors.summary)}
                    helperText={touched.summary && errors.summary}
                />

                <FormControl>
                    <TextField
                        name={"slug" as keyof ICreateBlogItem}
                        label={"Slug"}
                        disabled={disabled}
                        variant={"outlined"}
                        value={values.slug}
                        onChange={handleChange}
                        error={touched.slug && !_.isUndefined(errors.slug)}
                        helperText={touched.slug && errors.slug}
                    />
                    <FormHelperText>
                        Über diesen Link ist der Beitrag zukünftig erreichbar: {Urls.BlogItem(values).path}
                    </FormHelperText>
                </FormControl>

                {/*<FormControlLabel
                    label={"Entwurf"}
                    disabled={disabled}
                    control={
                        <Checkbox
                            name={"isDraft" as keyof ICreateBlogItem}
                            value={values.isDraft}
                            onChange={handleChange}
                        />
                    }
                />*/}

                <Button type={"submit"} variant={"contained"} disabled={disabled}>
                    Los geht&apos;s!
                </Button>
            </Stack>
        </form>
    );
};

export default NewBlogItemForm;
