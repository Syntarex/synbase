import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import Stack from "@mui/material/Stack";
import _ from "lodash";
import React from "react";
import { useErrors } from "../../../hook/error/use-errors.hook";
import ErrorItem from "../error-item/error-item.component";

interface IErrorListProps {
    sx?: SxProps<Theme>;
}
const ErrorList = (props: IErrorListProps) => {
    const { sx } = props;

    const [errors, , removeError] = useErrors();

    if (_.isEmpty(errors)) {
        return null;
    }

    return (
        <Stack sx={sx}>
            {errors.map((error, index) => (
                <ErrorItem key={`error-${index}`} error={error} onRemove={removeError} />
            ))}
        </Stack>
    );
};

export default ErrorList;
