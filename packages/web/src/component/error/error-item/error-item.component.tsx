import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import _ from "lodash";
import React from "react";

interface IErrorItemProps {
    error: Error;
    onRemove?: (error: Error) => void;
}

const ErrorItem = (props: IErrorItemProps) => {
    const { error, onRemove } = props;

    const onClose = React.useCallback(() => {
        if (_.isUndefined(onRemove)) {
            return;
        }

        onRemove(error);
    }, [error, onRemove]);

    return (
        <Alert severity={"error"} onClose={onClose}>
            <AlertTitle>Fehler :&apos;(</AlertTitle>

            {error.message}
        </Alert>
    );
};

export default ErrorItem;
