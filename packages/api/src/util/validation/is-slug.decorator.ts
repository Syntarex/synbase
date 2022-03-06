import { applyDecorators } from "@nestjs/common";
import { IsNotEmpty, IsString, Matches } from "class-validator";

const regex = new RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$");

export function IsSlug() {
    return applyDecorators(IsString(), IsNotEmpty(), Matches(regex));
}
