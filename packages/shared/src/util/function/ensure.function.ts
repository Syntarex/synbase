import _ from "lodash";

export function ensure<T = string>(value?: T | null, errorMessage?: string): T {
    if (_.isUndefined(value) || _.isNull(value)) {
        throw new Error(_.isUndefined(errorMessage) ? "Ein Wert wurde nicht gefunden." : errorMessage);
    }

    return value;
}
