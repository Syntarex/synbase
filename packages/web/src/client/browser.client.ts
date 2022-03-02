import { Synbase } from "@synbase/shared";
import { ClientEnv } from "../constants/constants.client";

export const browserClient = new Synbase(ClientEnv.apiUrl);
