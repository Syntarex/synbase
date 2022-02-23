import { Synbase } from "@synbase/shared";
import { Env } from "./constants";

export const synbase = new Synbase(Env.apiUrl);
