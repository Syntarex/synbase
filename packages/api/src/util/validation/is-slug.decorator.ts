import { applyDecorators } from "@nestjs/common";
import { ProfileConstants } from "@synbase/shared";
import { IsNotEmpty, IsString, Matches } from "class-validator";

const { SLUG_REGEX } = ProfileConstants;

export function IsSlug() {
    return applyDecorators(IsString(), IsNotEmpty(), Matches(SLUG_REGEX));
}
