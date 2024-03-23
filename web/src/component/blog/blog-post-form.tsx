"use client";

import { upsertBlogPostMutation } from "@/data/client/blog-post";
import { UpsertBlogPost, upsertBlogPostValidation } from "@/model/blog-post";
import { TextField } from "@mui/material";
import { BlogPost } from "@synbase/database";
import { Form, FormProps } from "../common/form";
import { MarkdownEditor } from "../common/markdown-editor";

type BlogPostFormProps = Omit<
    FormProps<UpsertBlogPost, BlogPost>,
    "fields" | "mutation" | "validationSchema" | "actions"
>;

// TODO: Löschen Button
export const BlogPostForm = (props: BlogPostFormProps) => {
    return (
        <Form<UpsertBlogPost, BlogPost>
            mutation={upsertBlogPostMutation}
            validationSchema={upsertBlogPostValidation}
            fields={{
                title: {
                    label: "Titel",
                    input: ({ inputProps }) => <TextField {...inputProps} />,
                    helperText: "Die Überschrift des Beitrags. Sollte möglichst SEO-wirksam sein.",
                },
                slug: {
                    label: "Slug",
                    input: ({ inputProps }) => <TextField {...inputProps} />,
                    helperText: "Die URL zum Beitrag: /blog/[slug].",
                },
                description: {
                    label: "Beschreibung",
                    input: ({ inputProps }) => <TextField {...inputProps} />,
                    helperText: "Die Kurzbeschreibung des Beitrags. Wird als Meta-Description gesetzt.",
                },
                content: {
                    label: "Inhalt",
                    input: ({ inputProps }) => <MarkdownEditor {...inputProps} />,
                    helperText: "Der Inhalt des Beitrags. Unterstützt Markdown.",
                },
            }}
            {...props}
        />
    );
};

/*



            <MarkdownEditor
                name={"content"}
                value={values.content}
                error={touched.content && !!errors.content}
                helperText={
                    touched.content && errors.content
                        ? errors.content
                        : ""
                }
                onChange={handleChange}
                onBlur={handleBlur}
            />

            <Button type={"submit"} variant={"contained"} disabled={disabled}>
                Abschicken
            </Button>
        </Stack> */
