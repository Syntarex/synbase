import { applyDecorators, UseFilters } from "@nestjs/common";
import { ForbiddenRedirectFilter } from "../../error/filter/forbidden-redirect.filter";

export function RedirectOnForbidden(url: string) {
    return applyDecorators(UseFilters(new ForbiddenRedirectFilter(url)));
}
