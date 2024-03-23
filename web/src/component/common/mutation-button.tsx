"use client";

import { Button, ButtonProps } from "@mui/material";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { replace } from "lodash";
import { ReactNode, useCallback, useEffect, useMemo } from "react";
import { useCountdown } from "usehooks-ts";
import { AnyObject } from "yup";

interface MutationButtonProps<Entity, Param> {
    mutation: UseMutationOptions<Entity, Error, Param>;
    /**
     * Der Parameter, welcher an die Mutation übergeben wird.
     * @example 30530de0-e5e5-11ee-b5a1-12c190008588
     */
    param: Param;
    /**
     * Die Zeit, in Sekunden, welche verstreicht, bis der Button die zweite Bestätigung zulässt.
     * @default 0
     */
    delay?: number;
    children?: ReactNode;
    buttonProps?: Omit<ButtonProps, "onClick">;
    onMutate?: (param: Param) => void;
    onSuccess?: (result: Entity) => void;
}

/**
 * Ein Button, welcher die Mutation einer Entität ermöglicht.
 * Erlaubt es eine zweite Bestätigung zu erfordern, wenn es sich um eine kritische Mutation handelt.
 */
export function MutationButton<Entity = AnyObject, Param = string>({
    mutation,
    param,
    delay = 0,
    children,
    buttonProps,
    onMutate,
    onSuccess,
}: MutationButtonProps<Entity, Param>) {
    const { mutate, status, data, reset } = useMutation(mutation);

    // Initialisiere Countdown
    const [count, countdown] = useCountdown({
        countStart: delay,
        countStop: 0, // Countdown stoppt nicht, wenn count < 0
        intervalMs: 1000, // Jede Sekunde
    });

    // Melde Status der Mutation zurück
    useEffect(() => {
        if (onMutate && status === "pending") {
            onMutate(param);
        } else if (onSuccess && status === "success") {
            onSuccess(data);
            reset();
        }
    }, [onSuccess, onMutate, reset, param, status, data]);

    // Stoppe Countdown, wenn Count unter 0 fällt
    useEffect(() => {
        if (count < 0) {
            countdown.stopCountdown();
        }
    }, [count, countdown]);

    // Ermittle Button-Status anhand des Countdowns
    const buttonStatus = useMemo<"idle" | "counting" | "confirming">(() => {
        if (count <= 0) {
            return "confirming";
        }

        if (count === delay) {
            return "idle";
        }

        return "counting";
    }, [count, delay]);

    // Button-Aktion, je nach Status
    const onClick = useCallback(() => {
        if (status === "idle") {
            switch (buttonStatus) {
                case "confirming":
                    mutate(param);
                case "counting":
                    countdown.stopCountdown();
                    countdown.resetCountdown();
                    break;

                case "idle":
                    countdown.startCountdown();
                    break;
            }
        }
    }, [buttonStatus, mutate, param, countdown, status]);

    const buttonText = useMemo(() => {
        switch (status) {
            case "pending":
                return "Bitte warten...";
            case "success":
                return "Erfolg!";
        }

        switch (buttonStatus) {
            case "confirming":
                // Zweite Bestätigung wird nicht verlangt, also zeige direkt Kinder an
                if (delay === 0) {
                    return children;
                }

                return "Bestätigen";
            case "counting":
                return replace(count.toFixed(1), ".0", "");
            case "idle":
                return children;
        }
    }, [status, buttonStatus, count, delay, children]);

    return (
        <Button
            variant={buttonStatus === "confirming" ? "contained" : "outlined"}
            onClick={onClick}
            {...buttonProps}
            disabled={status !== "idle" || buttonProps?.disabled}
        >
            {buttonText}
        </Button>
    );
}
