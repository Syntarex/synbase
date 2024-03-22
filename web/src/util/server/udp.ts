import "server-only";

import dgram from "dgram";

/**
 * Prüft ob ein UDP-Port erreichbar ist.
 */
export const checkUdp = (host: string, port: number): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
        const client = dgram.createSocket("udp4");

        client.send("1", port, host, (error, payload) => {
            if (error || !payload) {
                resolve(false);
            }

            resolve(true);
        });
    });
};
