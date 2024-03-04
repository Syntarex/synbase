import { Prisma } from "@synbase/database";
import { boolean, object, string } from "yup";

// TODO: Fehlermeldungen fehlen
export const BlogPostValidation = object<Prisma.BlogPostCreateInput>({
    slug: string().required().max(60),
    title: string().required().max(60),
    description: string().required().max(150), // Wird als meta-description verwendet, entsprechend, sollte die Beschreibung nicht mehr als 150 Zeichen lang sein
    content: string().required(),
    isDraft: boolean().required(),
});
