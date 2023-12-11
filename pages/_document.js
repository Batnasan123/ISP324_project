import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add the Google Fonts import */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;1,300&family=Roboto+Slab:wght@600&family=Roboto:ital@0;1&display=swap"
        />
        <link
          rel="icon"
          // href=""
          href="https://assets-global.website-files.com/6135e5f06048e4e83fb2c8ab/6191ef0044ab4794219e090c_favicon.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
