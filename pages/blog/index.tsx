import React from 'react';
import Container from '../../components/container';
import HomeNav from '../../components/homeNav';
import PostPreview from '../../components/postPreview';
import { Pane, majorScale } from 'evergreen-ui';
import { posts, posts as postsFromCMS } from '../../content';
import matter from 'gray-matter';
import path from 'path';
import fs from 'fs';
import orderby from 'lodash.orderby';

const Blog = ({ posts }) => {
  return (
    <Pane>
      <header>
        <HomeNav />
      </header>
      <main>
        <Container>
          {posts.map((post) => (
            <Pane key={post.title} marginY={majorScale(5)}>
              <PostPreview post={post} />
            </Pane>
          ))}
        </Container>
      </main>
    </Pane>
  );
};

Blog.defaultProps = {
  posts: [],
};

export function getStaticProps(ctx) {
  // Posts from the fake cms
  const cmsPosts = (
    ctx.preview ? postsFromCMS.draft : postsFromCMS.published
  ).map((post) => {
    const { data } = matter(post);
    return data;
  });

  // Posts from the fs
  const postsPath = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsPath);
  const filePosts = filenames.map((name) => {
    const fullPath = path.join(process.cwd(), 'posts', name);
    const file = fs.readFileSync(fullPath, 'utf-8');
    const { data } = matter(file);
    return data;
  });

  const posts = [...cmsPosts, ...filePosts];

  return {
    props: { posts },
  };
}

export default Blog;

/**
 * Need to get the posts from the
 * fs and our CMS
 */