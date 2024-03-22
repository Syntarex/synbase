"use client";

import ky from "ky";
import { isArray, toString } from "lodash";
import { ensure } from "../string";

/**
 * Ein HTTP-Client, welcher zur Abfrage der eigenen API genutzt werden kann.
 * @example const blogPosts = await api.get("blog-posts").json();
 */
export const api = ky.create({
    prefixUrl: `${ensure(process.env.WEB_URL)}/api`,
    hooks: {
        // Interpretiere Fehler
        beforeError: [
            async (error) => {
                try {
                    const json = await error.response.json();

                    if (isArray(json.errors)) {
                        error.message = json.errors.map((each: unknown) => toString(each)).join("\n");
                    }
                } catch (ex) {
                    return error;
                }

                return error;
            },
        ],
    },
});
