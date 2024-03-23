"use client";

import { Close, Save } from "@mui/icons-material";
import {
    Alert,
    Button,
    ButtonProps,
    FormControl,
    FormHelperText,
    FormLabel,
    InputProps as MuiInputProps,
    Stack,
    StackProps,
    SxProps,
    TextField,
} from "@mui/material";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { FormikErrors, FormikTouched, useFormik } from "formik";
import { toString } from "lodash";
import { ReactNode, useEffect, useMemo } from "react";
import * as yup from "yup";

/**
 * Properties eines Input-Elementes, welches von einem <FormDialog> kontrolliert wird.
 * Die Werte berücksichtigen aktuellen Zustand der Mutation und des Formulars.
 */
export interface InputProps<Value = unknown>
    extends Pick<MuiInputProps, "name" | "disabled" | "error" | "onBlur" | "onChange"> {
    value: Value;
}

export interface FormInputProps<Value = unknown> {
    /**
     * Wichtig! Gebe diese inputProps an dein Input weiter.
     * @example (inputProps, ...) => <TextField {...inputProps} />
     */
    inputProps: InputProps<Value>;
    field: keyof Value;
    values: Value;
    setValue: (value: unknown) => Promise<void> | Promise<FormikErrors<Value>>;
    touched: FormikTouched<Value>;
    errors: FormikErrors<Value>;
}

// Typing fixen
/**
 * Ein Input, welcher die Bearbeitung eines Feldes ermöglicht.
 */
type FormInput<Value, Props extends FormInputProps<Value> = FormInputProps<Value>> = (props: Props) => ReactNode;

export interface FormProps<Value extends yup.AnyObject, Result> {
    sx?: SxProps;
    value: Value;
    /**
     * Nutzt das Formular <form>?
     * Achtung: Ein <form> innerhalb eines <form> ist verboten!
     * @default false
     */
    form?: boolean;
    /** Ist das gesamte Formular deaktiviert? */
    disabled?: boolean;
    /** Wird über Formular-Feldern gerendert. */
    children?: ReactNode;
    /** Rendere Inputs für Felder deiner Entität. */
    fields: Partial<
        Record<
            keyof Value,
            {
                hidden?: (values: Value) => boolean;
                label?: string;
                /**
                 * Rendere die Komponente, welche zur Bearbeitung des Feldes verwendet wird.
                 * Die als Property übergebenen InputProps, müssen an deine Komponente übergeben werden.
                 * @example (inputProps) => <TextField {...inputProps} />
                 */
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                input: FormInput<any>; // TODO: Der value-Type wäre hier interessant
                helperText?: string;
            }
        >
    >;
    /** Die Mutation, welche verwendet wird um deine Entität zu mutieren. */
    mutation: UseMutationOptions<Result, Error, Value>;
    /** Soll sich das Formular zurücksetzen, sobald die Mutation durchgeführt wurde? */
    resetOnSuccess?: boolean;
    /** Zeige einen alternativen Erfolgstext an. @default "Erfolg!" */
    successMessage?: string | null;
    /** Zeige einen alternativen Ladetext an. @default "Bitte warten..." */
    pendingMessage?: string | null;
    onSuccess?: (result: Result) => void;
    onError?: (error: Error) => void;
    /** Wenn gesetzt, wird ein Abbrechen-Button gerendert. */
    cancelButtonProps?: Omit<ButtonProps, "disabled">;
    validationSchema?: yup.ObjectSchema<yup.AnyObject, Value>;
    /**
     * Soll das readonly ID-Feld angezeigt werden?
     * @default InDevEnvironment
     */
    showIdField?: boolean;
    /**
     * Aktionen, welche rechts neben Speichern-Button, gerendert werden.
     */
    actions?: ReactNode;
}

/**
 * Ein Formular, welches in einem Dialog rendert.
 * Erleichtert, durch implementiertes Standardverhalten, die Mutation eines Objekts.
 */
export function Form<Value extends yup.AnyObject, Result extends { id: string }>({
    sx,
    value,
    form = false,
    disabled = false,
    children,
    fields,
    mutation,
    resetOnSuccess = false,
    successMessage = "Erfolg!",
    pendingMessage = "Bitte warten...",
    onSuccess,
    onError,
    cancelButtonProps,
    validationSchema,
    showIdField = process.env.NODE_ENV === "development",
    actions,
}: FormProps<Value, Result>) {
    // Initialisiere Mutation
    const { status, mutate, reset, data, error } = useMutation(mutation);

    // Formular
    const { values, errors, touched, resetForm, setFieldValue, handleChange, handleBlur, handleSubmit, submitForm } =
        useFormik({
            initialValues: value,
            enableReinitialize: true,
            onSubmit: async (formData) => {
                if (status === "pending" || disabled) {
                    return;
                }

                mutate(formData);
            },
            validationSchema,
        });

    // Melde Ergebnis zurück
    useEffect(() => {
        if (data) {
            if (onSuccess) {
                onSuccess(data);
            }

            if (resetOnSuccess) {
                resetForm();
                reset();
            }
        }
    }, [data, onSuccess, resetOnSuccess, resetForm, reset]);

    // Melde Fehler zurück
    useEffect(() => {
        if (error && onError) {
            onError(error);
        }
    }, [error, onError]);

    // Erstelle Komponenten für übergebene Input-Elemente
    const inputs = useMemo(() => {
        // Erstelle Input-Props für ein Feld
        const getInputProps = (field: keyof Value): InputProps<Value> => ({
            name: toString(field),
            disabled: disabled || status === "pending",
            value: values[field],
            error: touched[field] && !!errors[field],
            onBlur: handleBlur,
            onChange: handleChange,
        });

        // Alle erstellten Komponenten
        const components: ReactNode[] = [];

        // Iteriere über jedes angegebene Feld
        for (const field in fields) {
            const fieldKey = field as keyof Value;
            const fieldValue = fields[fieldKey];

            if (!fieldValue) {
                continue;
            }

            const { hidden, label, input, helperText } = fieldValue;

            // Input ist versteckt, also tue überspringe
            if (hidden && hidden(values)) {
                continue;
            }

            const inputProps = getInputProps(fieldKey);

            // Erstelle Komponente für ein Feld
            components.push(
                <FormControl key={`form-dialog-${field}`} error={touched[fieldKey] && !!errors[fieldKey]}>
                    {label && <FormLabel>{label}</FormLabel>}

                    {input({
                        inputProps, // Gebe InputProps an Komponente weiter
                        field,
                        values,
                        setValue: (value) => setFieldValue(field, value),
                        touched,
                        errors,
                    })}

                    {(helperText || (touched[fieldKey] && !!errors[fieldKey])) && (
                        <FormHelperText>
                            {touched[fieldKey] && !!errors[fieldKey] ? errors[fieldKey]?.toString() : helperText}
                        </FormHelperText>
                    )}
                </FormControl>,
            );
        }

        return components;
    }, [status, values, touched, handleBlur, handleChange, setFieldValue, errors, fields, disabled]);

    const FormStack = useMemo(
        () =>
            form
                ? (props: StackProps<"form">) => <Stack component={"form"} onSubmit={handleSubmit} {...props} />
                : (props: StackProps) => <Stack {...props} />,
        [form, handleSubmit],
    );

    return (
        <FormStack sx={sx} gap={2}>
            {children}

            {showIdField && (
                <FormControl error={touched.id && !!errors.id}>
                    <FormLabel>ID</FormLabel>

                    <TextField
                        disabled
                        name={"id"}
                        value={values.id}
                        error={touched.id && !!errors.id}
                        placeholder={"Automatisch"}
                    />

                    <FormHelperText>Die interne ID. Kann nicht verändert werden.</FormHelperText>
                </FormControl>
            )}

            {inputs}

            {status === "pending" && !!pendingMessage && (
                <Alert variant={"outlined"} color={"info"} severity={"info"}>
                    {pendingMessage}
                </Alert>
            )}

            {status === "success" && !!successMessage && (
                <Alert variant={"outlined"} color={"success"} severity={"success"} onClose={reset}>
                    {successMessage}
                </Alert>
            )}

            {status === "error" && (
                <Alert variant={"outlined"} color={"error"} severity={"error"} onClose={reset}>
                    {error.message}
                </Alert>
            )}

            <Stack direction={"row"} alignItems={"center"} gap={2}>
                {cancelButtonProps && (
                    <Button disabled={status === "pending"} startIcon={<Close />} {...cancelButtonProps}>
                        Abbrechen
                    </Button>
                )}

                <Button
                    type={form ? "submit" : undefined}
                    disabled={disabled || status === "pending"}
                    variant={"contained"}
                    startIcon={<Save />}
                    onClick={submitForm}
                >
                    Speichern
                </Button>

                {actions && (
                    <Stack direction={"row"} flexGrow={1} alignItems={"center"} justifyContent={"flex-end"} gap={2}>
                        {actions}
                    </Stack>
                )}
            </Stack>
        </FormStack>
    );
}
