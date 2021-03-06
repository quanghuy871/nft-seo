import {Html, Head, Main, NextScript} from 'next/document';
import {resetServerContext} from 'react-beautiful-dnd';

function Document() {
  return (
    <Html>
      <Head>
        {/*Global site tag (gtag.js) - Google Analytics*/}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_TRACKING_ID}`}></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date());

              gtag('config', '${process.env.NEXT_PUBLIC_TRACKING_ID}');
            `,
          }}
        />
      </Head>
      <body>
      <Main/>
      <NextScript/>
      </body>
    </Html>
  );
}

// export async function getStaticProps(context) {
//   resetServerContext();
//
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }

export default Document;