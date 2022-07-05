import NextAuth, { User, Session } from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import GitHubProvider from 'next-auth/providers/github';
import clientPromise from '../../../lib/mongodb';

export default (req, res) =>
  NextAuth({
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    pages: {
      signIn: '/signin',
    },
    session: {
      strategy: 'jwt',
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    callbacks: {
      async jwt({ token }) {
        token.userRole = 'admin';
        return token;
      },
    },
  })(req, res);
