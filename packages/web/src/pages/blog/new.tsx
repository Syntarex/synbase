import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ICreateBlogItem } from "@synbase/shared";
import React from "react";
import { useMutation } from "react-query";
import NewBlogItemForm from "../../component/blog-item/new-blog-item-form/new-blog-item-form.component";
import { Urls } from "../../constants/constants.client";
import { useAuth } from "../../hook/auth/use-auth.hook";
import { useSynbase } from "../../hook/client/use-synbase.hook";
import { useBreadcrumb } from "../../hook/layout/use-breadcrumb.hook";
import { useRedirect } from "../../hook/use-redirect.hook";

const NewBlogItemPage = () => {
    useBreadcrumb([Urls.Blog, Urls.NewBlogItem]);

    const redirect = useRedirect();

    const synbase = useSynbase();

    useAuth({ redirectEnabled: true });

    const { mutate: createBlogItem, isLoading } = useMutation(
        async (body: ICreateBlogItem) => synbase.blogItems.create(body),
        {
            onSuccess: (blogItem) => {
                redirect(Urls.BlogItem(blogItem));
            },
        },
    );

    return (
        <Stack spacing={2}>
            <Typography variant={"h3"}>Blog-Beitrag erstellen</Typography>

            <Typography>
                Keine Sorge. Hier legst du nur die grundlegenden Informationen für deinen Blog-Beitrag fest. Du kannst
                alles im Nachheinein noch ändern und veröffentlicht wird auch erstmal nichts.
            </Typography>

            <NewBlogItemForm disabled={isLoading} onSubmit={createBlogItem} />
        </Stack>
    );
};

export default NewBlogItemPage;
