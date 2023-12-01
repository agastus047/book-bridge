import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/../lib/prisma";

export const authOptions = (req, res) => {
    return {
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                profile: async (profile) => {
                    try {
                        // create user here all details in profile object
                    } catch (err) {
                        throw new Error(err.message)
                    }
                }
            }),
            CredentialsProvider({
                id: 'credentials-update',
                credentials: {},
                async authorize(credentials) {
                    try {
                        const { email, department, division, address } = credentials;
                        const user = await Users.findOne({ email: email }); // find the user to update values
                        if (!user) {

                            throw new Error('User not found');

                        } else {
                            // update user
                        }
                    } catch (err) {
                        console.log('error', err.message);
                        throw new Error(err.message);
                    }
                },
            })
        ],
        callbacks: {
            jwt: async ({ token, user }) => {
                user && (token.user = user);
                return token;
            },
            session: async ({ session, token }) => {
                console.log(token.user)
                session.user = token.user
                return session;
            },
        }
    }
};

export default (req, res) => {
    return NextAuth(req, res, authOptions(req, res));
};