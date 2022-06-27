import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Permission } from "@synbase/shared";
import _ from "lodash";
import { IRequest } from "../../util/model/request.model";

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext) {
        /* TODO: Prüfe ob .get() null oder undefined zurückliefert, wenn SetMetaData() nicht ausgeführt wurde, um die Metadaten zu setzen. */
        const routePermissions = this.reflector.get<Permission[] | null>("permissions", context.getHandler());

        // getArgs() liefert Original-Parameter der express-Route (req, res, next) zurück
        const userPermissions = (context.getArgs()[0] as IRequest).user.permissions;

        if (_.isNull(routePermissions) || _.isEmpty(routePermissions)) {
            return true;
        }

        /* TODO: Mit Lodash lösen? */
        const hasPermission = () =>
            routePermissions.every((routePermission) => userPermissions.includes(routePermission));

        return hasPermission();
    }
}
