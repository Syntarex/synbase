import { applyDecorators } from "@nestjs/common";
import { Transform } from "class-transformer";
import _ from "lodash";

interface ITransformToOptions {
    type: "number";
}

export function TransformTo({ type }: ITransformToOptions) {
    switch (type) {
        case "number":
            return applyDecorators(Transform(({ value }) => (_.isUndefined(value) ? undefined : _.toNumber(value))));
    }
}
