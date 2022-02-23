import cookie from "cookie";
import { IncomingMessage } from "http";
import _ from "lodash";

export const parseCookies = (req?: IncomingMessage) => {
    if (_.isUndefined(req) || _.isUndefined(req.headers)) {
        return {};
    }

    return cookie.parse(req.headers.cookie || "");
};
