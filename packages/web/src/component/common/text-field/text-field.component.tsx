import MuiTextField, { TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";
import _ from "lodash";
import React from "react";

interface ITextFieldProps extends Omit<MuiTextFieldProps, "onChange"> {
    onChange: (value: string | null) => void;
}

const TextField = (props: ITextFieldProps) => {
    const { onChange } = props;

    const handleChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;

            if (_.isEmpty(value)) {
                onChange(null);
                return;
            }

            onChange(value);
        },
        [onChange],
    );

    return <MuiTextField {...props} onChange={handleChange} />;
};

export default TextField;
