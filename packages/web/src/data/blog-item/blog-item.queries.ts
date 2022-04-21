import { ApiResource, IBlogItem, IGetBlogItems } from "@synbase/shared";
import { SynbaseQuery } from "../../model/client/synbase.query";

export const getAllBlogItems: SynbaseQuery<IBlogItem[], IGetBlogItems> = (synbase, query) => ({
    queryKey: [ApiResource.BlogItem, query],
    queryFn: () => synbase.blogItems.getAll(query),
});

export const getBlogItem: SynbaseQuery<IBlogItem | null, string> = (synbase, id) => ({
    queryKey: [ApiResource.BlogItem, id],
    queryFn: () => synbase.blogItems.get(id),
});

export const getBlogItemBySlug: SynbaseQuery<IBlogItem | null, string> = (synbase, slug) => ({
    queryKey: [ApiResource.BlogItem, slug],
    queryFn: () => synbase.blogItems.getBySlug(slug),
});
