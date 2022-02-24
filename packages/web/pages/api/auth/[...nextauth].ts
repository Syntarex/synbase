import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export default NextAuth({
    providers: [
        KeycloakProvider({
            clientId: "synbase",
            authorization: {
                params: {
                    scope: "openid profile email",
                },
            },
            clientSecret: "59nxSYNcAtScZo9EpoGdevkn3q3julFG",
            issuer: "https://id.synbase.io/auth/realms/synbase",
        }),
    ],
});
