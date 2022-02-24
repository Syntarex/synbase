import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { Env } from "../../../src/constants";

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
});
