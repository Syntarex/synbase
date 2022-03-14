import { Synbase } from "@synbase/shared";
import { QueryOptions } from "react-query";

export type SynbaseQuery<TResult, TPayload = unknown> = (
    synbase: Synbase,
    ...payload: TPayload[]
) => QueryOptions<TResult>;
