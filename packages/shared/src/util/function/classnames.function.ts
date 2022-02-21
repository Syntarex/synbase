import _ from "lodash";

export const classNames = (...classNames: Array<string | undefined>): string => {
    const validClassNames: string[] = classNames.filter((each) => !_.isUndefined(each) && !_.isEmpty(each)) as string[];

    return validClassNames.join(" ");
};
