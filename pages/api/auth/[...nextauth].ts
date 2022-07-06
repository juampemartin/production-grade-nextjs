import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import GitHubProvider from 'next-auth/providers/github';
import clientPromise from '../../../lib/mongodb';
import { connectToDB, doc, folder } from '../../../db';

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
      async session({ session, user, token }) {
        session.user.id = token.id as string;
        user = session.user;
        return session;
      },
      async jwt({ token, user, isNewUser }) {
        const { db } = await connectToDB();

        if (isNewUser) {
          const personalFolder = await folder.createFolder(db, {
            createdBy: user.id,
            name: 'Getting Started',
          });
          await doc.createDoc(db, {
            name: 'Start Here',
            folder: personalFolder._id,
            createdBy: user.id,
            content: {
              time: 1556098174501,
              blocks: [
                {
                  type: 'header',
                  data: {
                    text: 'Welcome to Next.js!',
                    level: 2,
                  },
                },
              ],
              version: '2.12.4',
            },
          });
        }

        if (token && user) {
          return { ...token, id: `${user.id}` };
        }

        return token;
      },
    },
  })(req, res);
