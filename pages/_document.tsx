import React from 'react';
import Document, { Head, Main, NextScript, Html } from 'next/document';
import { extractStyles } from 'evergreen-ui';

interface DocumentProps {
  css: string;
  hydrationScript: any;
}

export default class MyDocument extends Document<DocumentProps> {
  static async getInitialProps({ renderPage }) {
    const page = await renderPage();
    const { css, hydrationScript } = extractStyles();

    return {
      ...page,
      css,
      hydrationScript,
    };
  }

  render() {
    const { css, hydrationScript } = this.props;

    return (
      <Html lang="eng-us">
        <Head>
          <style dangerouslySetInnerHTML={{ __html: css }} />
        </Head>

        <body>
          <Main />
          {hydrationScript}
          <NextScript />
        </body>
      </Html>
    );
  }
}
