import NextAuth, { DefaultSession } from "next-auth";
import { auth as authRequests } from '@/lib/api/auth'
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

const privateRoutes = [
    "/dashboard"
];

declare module "next-auth" {
    interface User {
        username: string;
        token: string;
    }
    interface Session {
        user: {
            username: string;
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        username: string;
    }
}

export const { handlers, auth } = NextAuth({
    providers: [
        Credentials({
            authorize: async (credentials) => {
                const { email, password } = credentials as { email: string, password: string };
                const response = await authRequests.signIn( { user: { email, password } } );

                if (response?.user) {
                    return response.user;
                }

                return null;
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.email = user.email;
                token.username = user.username;
                token.image = user.image;
                token.token = user.token;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (token.email) {
                session.user.email = token.email as string;
                session.user.username = token.username as string;
                session.user.token = token.token as string;
            }
            return session;
        },
        authorized: async ({ auth, request }) => {
            const isAuthorized = !!auth?.user;
            const isPrivateRoute = privateRoutes.some(route => request.nextUrl.pathname.startsWith(route));

            if (!isAuthorized && isPrivateRoute) {
                const url = new URL(request.nextUrl);
                url.pathname = "/login"
                return Response.redirect(url)
            }else if (isAuthorized && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register")) {
                const url = new URL(request.nextUrl);
                url.pathname = "/dashboard/articles"
                return Response.redirect(url)
            }

            return true;
        }
    }
}) 