import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import StringUtils from "@/app/utils/StringUtils";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
    name: "Credentials",
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      if (!credentials) {
        return null;
      }
      return { id: StringUtils.generateUUIDv4(), email: credentials.email, password: credentials?.password }
      
    }
  })
  ],
})


export { handler as GET, handler as POST };
