import React, { FC } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { majorScale, Pane, Heading, Spinner } from 'evergreen-ui';
import { Post } from '../../types';
import { useRouter } from 'next/router';
import { posts } from '../../content';
import Head from 'next/head';
import Container from '../../components/container';
import HomeNav from '../../components/homeNav';

const BlogPost: FC<Post> = ({ mdxSource, source, frontMatter }) => {
  const content = serialize(source);
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Pane width="100%" height="100%">
        <Spinner size={48} />
      </Pane>
    );
  }
  return (
    <Pane>
      <Head>
        <title>{`Casino Blog | ${frontMatter.title}`}</title>
        <meta name="description" content={frontMatter.summary} />
      </Head>
      <header>
        <HomeNav />
      </header>
      <main>
        <MDXRemote {...mdxSource} >
          <Container>
            <Heading
              fontSize="clamp(2rem, 8vw, 6rem)"
              lineHeight="clamp(2rem, 8vw, 6rem)"
              marginY={majorScale(3)}
            >
              {frontMatter.title}
            </Heading>
            {/* <Pane>{content}</Pane> */}
          </Container>
        </MDXRemote>
      </main>
    </Pane>
  );
};

BlogPost.defaultProps = {
  // source: '',
  frontMatter: { title: 'default title', summary: 'summary', publishedOn: '' },
};

export function getStaticPaths() {
  const postsPath = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsPath);
  const slugs = filenames.map((name) => {
    const filePath = path.join(postsPath, name);
    const file = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(file);
    return data;
  });

  return {
    paths: slugs.map((s) => ({ params: { slug: s.slug } })),
    fallback: true,
  };
}

/**
 * Need to get the paths here
 * then the correct post for the matching path
 * Posts can come from the fs or our CMS
 */

export async function getStaticProps({ params, preview }) {
  let post;
  try {
    const filesPath = path.join(process.cwd(), 'posts', params.slug + '.mdx');
    post = fs.readFileSync(filesPath, 'utf-8');
  } catch {
    const cmsPosts = (preview ? posts.draft : posts.published).map((p) => {
      return matter(p);
    });

    const match = cmsPosts.find((p) => p.data.slug === params.slug);
    post = match.content;
  }

  const { data } = matter(post);
  const mdxSource = await serialize(post, { scope: data });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
}

export default BlogPost;
