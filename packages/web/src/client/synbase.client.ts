import { Synbase } from "@synbase/shared";
import { ClientEnv } from "../constants/constants.client";

const { apiUrl } = ClientEnv;

export const client = new Synbase(apiUrl);
export const publicClient = new Synbase(apiUrl);
