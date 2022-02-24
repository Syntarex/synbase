import _ from "lodash";
import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { Env } from "../../../src/constants";

/* TODO: AccessToken wird nicht automatisch aktualisiert */
export default NextAuth({
    providers: [
        KeycloakProvider({
            clientId: Env.keycloakClientId,
            authorization: {
                params: {
                    scope: "openid profile email",
                },
            },
            clientSecret: Env.keycloakClientSecret,
            issuer: `${Env.keycloakUrl}/realms/${Env.keycloakRealm}`,
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
        jwt: async ({ token, user }) => {
            if (!_.isUndefined(user)) {
                token = { accessToken: (user as any).accessToken };
            }

            return token;
        },
        session: async ({ session, token }) => {
            if (!_.isUndefined(token.accessToken)) {
                session.token = token.accessToken;
            }

            return session;
        },
    },
});
