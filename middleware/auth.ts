import { getToken } from 'next-auth/jwt';

export default async (req, res, next) => {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET as string,
  });

  if (token) {
    // Signed in
    req.user = token;
    next();
  } else {
    // Not Signed in
    res.status(401);
    res.end();
  }
};
