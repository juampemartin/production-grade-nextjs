import { Db, MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface PostFrontMatter {
  title: string;
  summary: string;
  publishedOn: string;
}

export interface Post {
  source: string,
  mdxSource: MDXRemoteSerializeResult,
  frontMatter: PostFrontMatter;
}

export interface UserSession {
  // id: string
  image: string;
  email: string;
  name: string;
}

export interface Request extends NextApiRequest {
  db: Db;
  dbClient: MongoClient;
  user: { email: string; id: string };
}
