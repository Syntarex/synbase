import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IRequest } from "../../util/model/request.model";

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext) {
        /* TODO: Kann das nicht auch undefined sein? */
        const routePermissions = this.reflector.get("permissions", context.getHandler());

        console.log(routePermissions);
        console.log(context.getArgs());

        // getArgs() liefert Original-Parameter der express-Route (req, res, next) zurück
        const userPermissions = (context.getArgs()[0] as IRequest).user.permissions;

        /* TODO: Prüfung auf undefined und Permissions */
        if (!routePermissions) {
            return true;
        }

        /* TODO: Mit Lodash lösen? */
        const hasPermission = () =>
            routePermissions.every((routePermission) => userPermissions.includes(routePermission));

        return hasPermission();
    }
}
