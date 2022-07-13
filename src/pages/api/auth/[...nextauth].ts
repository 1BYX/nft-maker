import NextAuth from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'
import DiscordProvider from 'next-auth/providers/discord'
import EmailProvider from 'next-auth/providers/email'

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '../../../server/db/client'

export default NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    // TwitterProvider({
    //   //@ts-ignore
    //   clientId: process.env.TWITTER_ID,
    //   //@ts-ignore
    //   clientSecret: process.env.TWITTER_SECRET,
    // }),
    // DiscordProvider({
    //   //@ts-ignore
    //   clientId: process.env.DISCORD_CLIENT_ID,
    //   //@ts-ignore
    //   clientSecret: process.env.DISCORD_CLIENT_SECRET,
    // }),
  ],
  secret: process.env.SECRET,
})
