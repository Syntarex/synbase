import * as yup from "yup";

export type Where<T, K extends keyof T> = { [P in K]: string | undefined };

/**
 * Validierung einer UUID.
 * Kann für API-Pfade genutzt werden.
 * @example /app/api/entity/[id] -> id muss eine UUID sein
 */
export const idValidation = yup.object({
    id: yup.string().required().uuid(),
});
