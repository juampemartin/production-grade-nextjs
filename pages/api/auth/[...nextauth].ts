import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default (req, res) =>
  NextAuth({
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
    ],
    database: process.env.DATABASE_URL,
    pages: {
      signIn: '/signin',
    },
    session: {
      jwt: true,
    },
    jwt: {
      secret: process.env.NEXT_AUTH_SECRET,
    },
  });
