import { ensure } from "@synbase/shared";
import _ from "lodash";
import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { Constants } from "../../../constants/constants.client";
import { ServerEnv } from "../../../constants/constants.server";
import { ISession } from "../../../model/auth/session.model";
import { IToken } from "../../../model/auth/token.model";

const refreshAccessToken = async (token: IToken): Promise<IToken> => {
    try {
        if (Date.now() > token.refreshTokenExpiresAt) throw Error;

        const details = {
            client_id: ServerEnv.keycloakClientId,
            client_secret: ServerEnv.keycloakClientSecret,
            grant_type: ["refresh_token"],
            refresh_token: token.refreshToken,
        };

        const formBody = Object.entries(details)
            .map(([key, value]: [string, any]) => {
                const encodedKey = encodeURIComponent(key);
                const encodedValue = encodeURIComponent(value);
                return encodedKey + "=" + encodedValue;
            })
            .join("&");

        const response = await fetch(
            `${ServerEnv.keycloakUrl}/realms/${ServerEnv.keycloakRealm}/protocol/openid-connect/token`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                },
                body: formBody,
            },
        );

        const refreshedTokens = await response.json();

        if (!response.ok) throw refreshedTokens;

        const { access_token, refresh_token, expires_in, refresh_expires_in } = refreshedTokens;

        return {
            ...token,
            accessToken: ensure(access_token),
            accessTokenExpiresAt: Date.now() + (ensure(expires_in as number) - Constants.sessionRefetchInterval) * 1000,
            refreshToken: !_.isUndefined(refresh_token) ? refresh_token : token.refreshToken,
            refreshTokenExpiresAt:
                Date.now() + (ensure(refresh_expires_in as number) - Constants.sessionRefetchInterval) * 1000,
        };
    } catch (error) {
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
};

export default NextAuth({
    providers: [
        KeycloakProvider({
            clientId: ServerEnv.keycloakClientId,
            clientSecret: ServerEnv.keycloakClientSecret,
            issuer: `${ServerEnv.keycloakUrl}/realms/${ServerEnv.keycloakRealm}`,
            profileUrl: `${ServerEnv.keycloakUrl}/userinfo`,
            profile: (profile) => ({
                ...profile,
                id: profile.sub,
            }),
            authorization: {
                params: {
                    scope: "openid profile email",
                },
            },
        }),
    ],
    session: { strategy: "jwt" },
    useSecureCookies: true,
    callbacks: {
        signIn: async ({ account, user }) => {
            if (_.isEqual(account.provider, "keycloak")) {
                user.accessToken = account.access_token;

                return true;
            }

            return false;
        },
        jwt: async (params) => {
            const { account } = params;
            const token: IToken = params.token as IToken;

            if (!_.isUndefined(account)) {
                const { access_token, refresh_token, expires_at, refresh_expires_in } = account;

                token.accessToken = ensure(access_token);
                token.refreshToken = ensure(refresh_token);
                token.accessTokenExpiresAt = (ensure(expires_at) - Constants.sessionRefetchInterval) * 1000;
                token.refreshTokenExpiresAt =
                    Date.now() + (ensure(refresh_expires_in as number) - Constants.sessionRefetchInterval) * 1000;
            }

            if (token.accessTokenExpiresAt < Date.now()) {
                return await refreshAccessToken(token);
            }

            return token;
        },
        session: async ({ session: anySession, token: anyJwt }) => {
            const token: IToken = anyJwt as IToken;
            const session: ISession = {
                accessToken: token.accessToken,
                userId: token.sub,
                ...anySession,
                expires: new Date(token.refreshTokenExpiresAt).toISOString(),
            };

            return session;
        },
    },
});
