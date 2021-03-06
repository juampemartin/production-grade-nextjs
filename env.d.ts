declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
      NEXT_PUBLIC_API_HOST: string;
    }
  }
}

export {}
