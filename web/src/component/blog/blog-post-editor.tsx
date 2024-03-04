"use client";

import { BlogPostValidation } from "@/model/validation";
import { Button, FormControl, FormLabel, Stack, SxProps, TextField } from "@mui/material";
import { Prisma } from "@synbase/database";
import { useFormik } from "formik";
import { MarkdownEditor } from "../common/markdown-editor";

interface BlogPostEditorProps {
    sx?: SxProps;
    disabled?: boolean;
    value: Prisma.BlogPostCreateWithoutAuthorInput;
    onSubmit?: (value: Prisma.BlogPostCreateWithoutAuthorInput) => void;
}

export const BlogPostEditor = ({ sx, disabled = false, value, onSubmit }: BlogPostEditorProps) => {
    const { handleSubmit, handleChange, handleBlur, touched, errors, values } =
        useFormik<Prisma.BlogPostCreateWithoutAuthorInput>({
            initialValues: value,
            enableReinitialize: true,
            onSubmit: (blogPost) => {
                if (!disabled && onSubmit) {
                    onSubmit(blogPost);
                }
            },
            validationSchema: BlogPostValidation,
        });

    return (
        <Stack sx={sx} component={"form"} onSubmit={handleSubmit} spacing={2}>
            <FormControl disabled={disabled}>
                <FormLabel error={touched.slug && !!errors.slug}>Slug</FormLabel>

                <TextField
                    name={"slug"}
                    value={values.slug}
                    error={touched.slug && !!errors.slug}
                    helperText={touched.slug && errors.slug ? errors.slug : `Die URL zum Beitrag: /blog/${values.slug}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormControl>

            <FormControl disabled={disabled}>
                <FormLabel error={touched.title && !!errors.title}>Titel</FormLabel>

                <TextField
                    name={"title"}
                    value={values.title}
                    error={touched.title && !!errors.title}
                    helperText={touched.title && errors.title ? errors.title : `Die Überschrift des Beitrags.`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormControl>

            <FormControl disabled={disabled}>
                <FormLabel error={touched.description && !!errors.description}>Beschreibung</FormLabel>

                <TextField
                    name={"description"}
                    value={values.description}
                    error={touched.description && !!errors.description}
                    helperText={
                        touched.description && errors.description
                            ? errors.description
                            : "Die Kurzbeschreibung des Beitrags."
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormControl>

            <MarkdownEditor
                name={"content"}
                value={values.content}
                error={touched.content && !!errors.content}
                helperText={
                    touched.content && errors.content
                        ? errors.content
                        : "Der Inhalt des Beitrags. Unterstützt Markdown."
                }
                onChange={handleChange}
                onBlur={handleBlur}
            />

            <Button type={"submit"} variant={"contained"} disabled={disabled}>
                Abschicken
            </Button>
        </Stack>
    );
};
