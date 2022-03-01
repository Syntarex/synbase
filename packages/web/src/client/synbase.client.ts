import { Synbase } from "@synbase/shared";
import { ClientEnv } from "../constants/constants.client";

export const synbase = new Synbase(ClientEnv.apiUrl);
