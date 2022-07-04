import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default (req, res) =>
  NextAuth({
    providers: [
      Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      Providers.Twitter({
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET,
      }),
    ],
    callbacks: {
      signIn: '/api/auth/signin',
      signOut: '/api/auth/signout',
      signUp: '/api/auth/signup',
    },
    session: {
      jwt: true,
    },
    secret: process.env.NEXT_AUTH_SECRET,
    debug: process.env.NEXT_AUTH_DEBUG,
  })(req, res);
