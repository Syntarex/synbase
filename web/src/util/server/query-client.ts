import "server-only";

import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

/**
 * Serverseitiges Singleton des React QueryClients.
 */
export const getQueryClient = cache(() => new QueryClient());
