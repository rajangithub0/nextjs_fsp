import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    /**
     * returned by 'use Session ' and 'get Session' and received as a prop on the  'Session Provider' React Context
     */

    interface Session {
        user: {
            /** the user's id */
            id: string;
        } & DefaultSession["user"];
    }
}