import { isString } from "lodash";

/**
 * Formatiert einen String zum Slug.
 * Quelle: https://www.30secondsofcode.org/js/s/string-to-slug/
 * @example slugify("Hello World"); // hello-world
 */
export const slugify = (value: string): string =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

export const ensure = (value: unknown): string => {
    if (!value || !isString(value)) {
        throw new Error("Something couldn't be ensured.");
    }

    return value;
};
