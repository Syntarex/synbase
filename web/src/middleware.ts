import "server-only";

import { withScopesRequired } from "./middleware/withScopesRequired";

export const config = {
    matcher: ["/admin"],
};

// Erfordere Scope zum Zeigen des Admin Dashboards
const middleware = withScopesRequired("read:page:admin");

export default middleware;
