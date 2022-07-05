import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { connectToDB, folder, doc } from '../../../db';

export default (req, res) =>
  NextAuth({
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
    ],
    pages: {
      signIn: '/api/auth/signin',
    },
    session: {
      strategy: 'jwt',
    },
    callbacks: {
      async session({ session, user }) {
        session.user = user;
        return session;
      },
    },
  })(req, res);
