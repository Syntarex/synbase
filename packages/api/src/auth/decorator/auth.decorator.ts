import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Permission } from "@synbase/shared";
import { PermissionsGuard } from "../guard/permissions.guard";

export const Auth = (...permissions: Permission[]) =>
    applyDecorators(SetMetadata("permissions", permissions), UseGuards(AuthGuard, PermissionsGuard));
