import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { v4 as uuidv4 } from 'uuid';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "somemail@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email) {
          return null;
        }
        return { id: uuidv4(), email: credentials.email, password: credentials?.password }
      }
    })
  ],
})


export { handler as GET, handler as POST };
