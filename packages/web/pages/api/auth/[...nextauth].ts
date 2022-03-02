import _ from "lodash";
import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { ServerEnv } from "../../../src/constants/constants.server";

/* TODO: AccessToken wird nicht automatisch aktualisiert */
export default NextAuth({
    providers: [
        KeycloakProvider({
            clientId: ServerEnv.keycloakClientId,
            authorization: {
                params: {
                    scope: "openid profile email",
                },
            },
            clientSecret: ServerEnv.keycloakClientSecret,
            issuer: `${ServerEnv.keycloakUrl}/realms/${ServerEnv.keycloakRealm}`,
        }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        signIn: async ({ account, user }) => {
            if (_.isEqual(account.provider, "keycloak")) {
                user.accessToken = account.access_token;

                return true;
            }

            return false;
        },
        jwt: async ({ token, account }) => {
            if (!_.isUndefined(account) && !_.isUndefined(account.access_token)) {
                token = { accessToken: account.access_token, userId: token.sub };
            }

            return token;
        },
        session: async ({ session, token }) => {
            session.accessToken = token.accessToken;
            session.userId = token.userId;

            return session;
        },
    },
});
