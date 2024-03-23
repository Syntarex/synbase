import * as yup from "yup";

/**
 * Beschreibt URL-Parameter.
 * @example https://example.com?page=4&layout=fullscreen // { page: "4", layout: "fullscreen" }
 */
export type SearchParams<T, K extends keyof T> = { [P in K]: string | undefined };

/**
 * Prüft für das Feld `id`, ob es eine UUID ist.
 * @example { id: "91aacf06-e94b-11ee-98c0-12c190008588" } // valid
 */
export const idParamValidation = yup.object({
    id: yup.string().required().uuid(),
});
