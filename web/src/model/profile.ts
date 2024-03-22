import * as yup from "yup";

export const getProfileValidation = yup.object({
    id: yup.string().when({
        is: "me",
        otherwise: (schema) => schema.uuid()
    }).
});
