import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { NextAuthOptions } from "next-auth";

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: "1046309395840-1djerhhmu6auhqpt9rs8g2iigog5lht8.apps.googleusercontent.com",
            clientSecret: "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",
        }),
        FacebookProvider({
            clientId: "485636026011989",
            clientSecret: "485636026011989",
        }),
    ],
    // secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(options);
export { handler as GET, handler as POST };