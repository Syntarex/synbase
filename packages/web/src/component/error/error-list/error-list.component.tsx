import Stack from "@mui/material/Stack";
import React from "react";
import { useErrors } from "../../../hook/error/use-errors.hook";
import ErrorItem from "../error-item/error-item.component";

const ErrorList = () => {
    const [errors, , removeError] = useErrors();

    return (
        <Stack>
            {errors.map((error, index) => (
                <ErrorItem key={`error-${index}`} error={error} onRemove={removeError} />
            ))}
        </Stack>
    );
};

export default ErrorList;
