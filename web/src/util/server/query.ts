import "server-only";

import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

/**
 * Serverseitiges Singleton des React Query Clients.
 */
export const getQueryClient = cache(() => new QueryClient());
