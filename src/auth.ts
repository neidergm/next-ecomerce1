import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/prisma"
import { siginInEmail } from "./auth/actions/auth-actions"


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Github,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" }
        // email: {  },
        // password: { }
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        const user = await siginInEmail(email as string, password as string)
        if (user) return user

        return null
      }
    })
  ],
  // pages: {
  //   signIn: "/login",
  // },
  session: {
    strategy: "jwt",
  },
  callbacks: {

    async signIn({ user, account, profile, email, credentials }) {
      // console.log(user, account, profile, email, credentials)
      return true
    },

    async jwt({ token, user, trigger, session }) {

      const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } })

      token.roles = dbUser?.roles ?? ["no-role"]
      token.id = dbUser?.id;

      return token
    },

    async session({ session, token, user }) {
      if (session && session.user) {
        session.user.id = token.id as never
        session.user.roles = token.roles as never
      }

      return session
    },

  }
})