import { AuthOptions } from "next-auth"
import { compare } from "bcrypt"
import { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth ({
  providers: [
    CredentialsProvider ({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: {  label: 'password', type: 'password' }
      },
      async authorize(credentials: any, req: any) {
        if (!credentials.email || !credentials.password) {
          throw new Error('Invalid credentials')
        }

        // const user = lookupFunction(credentials.email)
        const user: any = {
          "id": 1,
          "email": "123@asd.com",
          "password": "asdasdasdasdad@sewrwerwerew.com"
        }

        if (!user || !user.hashedPassword) {
          throw new Error('Invalid credentials')
        }

        const isCorrectPassword = await compare(credentials.password, user.hashedPassword)

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials')
        }

        return { id: user.id, name: user.name, email: user.email }
      }
    })
  ],
})
