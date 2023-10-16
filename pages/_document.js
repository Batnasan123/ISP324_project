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
          // href="https://res.cloudinary.com/dfhvxswh6/image/upload/v1691979048/326238817_843833970046776_3151643487262701768_n_wbwl14.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
