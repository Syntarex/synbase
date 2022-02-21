import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Role } from "@synbase/shared";
import _ from "lodash";
import { IRequest } from "../../util/model/request.model";

const getRoles = (context: ExecutionContext): Role[] => {
    const request: IRequest = context.switchToHttp().getRequest();

    const { keycloakClientId } = request.env;

    if (_.isUndefined(request.user)) {
        throw new UnauthorizedException("Not logged in.");
    }

    return request.user.resource_access[keycloakClientId].roles;
};

export const HasRole = createParamDecorator((role: Role, context: ExecutionContext): boolean => {
    const roles = getRoles(context);

    return roles.indexOf(role) > -1;
});
