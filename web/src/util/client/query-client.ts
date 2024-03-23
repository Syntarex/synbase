"use client";

import { QueryClient } from "@tanstack/react-query";

const createQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // Setze Cache-Zeit auf 60 Minuten
                throwOnError: true,
                placeholderData: (previousData: unknown) => previousData, // Wenn Cache invalidiert wird, werden alte Daten weiterverwendet, bis neue Daten gefetched wurden
            },
            mutations: {
                throwOnError: true,
            },
        },
    });

// Das Singleton des QueryClients auf clientseite
let browserQueryClient: QueryClient | undefined = undefined;

/**
 * Gibt einen clientseitig verwendbares QueryClient-Singleton zurück.
 */
export const getQueryClient = () => {
    // Serverseitig (Static Generation Rendering bei Build-Time des Projekts)
    if (typeof window === "undefined") {
        return createQueryClient();
    }

    // Clientseitig - Initialisiere Singleton
    if (!browserQueryClient) {
        browserQueryClient = createQueryClient();
    }

    return browserQueryClient;
};
