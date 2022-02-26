import { Synbase } from "@synbase/shared";
import { ClientEnv } from "../constants/constants.client";

export const clientSynbase = new Synbase(ClientEnv.apiUrl);
