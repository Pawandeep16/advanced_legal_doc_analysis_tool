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

    session: {
        strategy: "jwt", // Use JWT (JSON Web Tokens) for the session
        maxAge: 30 * 24 * 60 * 60, // 30 days (how long the session lasts)
        updateAge: 24 * 60 * 60, // Update the session every 24 hours
    },

    // Optional: Add a callback to manage session information
    callbacks: {
        async session({ session, token }) {
            // Add custom fields to the session if needed
            session.user.id = token.sub;
            return session;
        },
    },
};

const handler = NextAuth(options);

// Export the handler
export { handler as GET, handler as POST };