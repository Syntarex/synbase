import { Synbase } from "@synbase/shared";
import { ServerEnv } from "../constants/constants.server";

export const serverSynbase = new Synbase(ServerEnv.apiUrl);
