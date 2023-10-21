import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import StringUtils from "@/app/utils/StringUtils";

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
      return { id: StringUtils.generateUUIDv4(), email: credentials.email, password: credentials?.password }
      
    }
  })
  ],
})


export { handler as GET, handler as POST };
