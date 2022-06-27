import { applyDecorators } from "@nestjs/common";
import { SLUG_REGEX } from "@synbase/shared";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export function IsSlug() {
    return applyDecorators(IsString(), IsNotEmpty(), Matches(SLUG_REGEX));
}
