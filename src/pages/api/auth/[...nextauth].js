import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/../lib/prisma";

export const authOptions = {
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
  ],
  callbacks: {
    async signIn({user,account}) {
        if(account.provider === "google") {
            const {name,email} = user;
            try {
                const userExists = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                });
                if(!userExists) {
                    const result = await prisma.user.create({
                        data: {
                            name,
                            email
                        },
                    });
                    return user;
                }
            }
            catch(err) {
                console.log(err);
            }
        }

        return user;
    },
  },
};

export default NextAuth(authOptions);