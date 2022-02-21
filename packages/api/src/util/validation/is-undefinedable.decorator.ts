import { applyDecorators } from "@nestjs/common";
import { ValidateIf, ValidationOptions } from "class-validator";
import _ from "lodash";

export function IsUndefinedable(options?: ValidationOptions) {
    return applyDecorators(ValidateIf((obj, value) => !_.isUndefined(value), options));
}
