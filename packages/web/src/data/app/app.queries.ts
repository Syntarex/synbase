import { ApiResource, IApp } from "@synbase/shared";
import { SynbaseQuery } from "../../model/client/synbase.query";

export const getApp: SynbaseQuery<IApp> = (synbase) => ({
    queryKey: ApiResource.App,
    queryFn: () => synbase.app.get(),
});
