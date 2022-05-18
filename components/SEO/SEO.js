import React from 'react';
import Head from 'next/head';

const SEO = (props) => {
  const {title, description, image} = props;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta property="og:url" content="https://nft-seo.vercel.app/"/>
      <meta property="og:site_name" content="pixl.page"/>
      <meta property="og:name" content={title}/>
      <meta property="og:description" content={description}/>
      <meta property="og:image" content={image.src ? image.src : image}/>
      <meta property="og:type" content="website" />

      {
        props.type && <meta property="og:image:type" content="image/jpeg"/>
      }

      {/*<meta property="og:image:width" content= "480" />*/}
      {/*<meta property="og:image:height" content= "480" />*/}

      <meta property="twitter:title" content={title}/>
      <meta property="twitter:site_name" content="pixl.page"/>
      <meta property="twitter:name" content={title}/>
      <meta property="twitter:description" content={description}/>
      <meta property="twitter:card" content="summary_large_image"/>
      <meta name="twitter:image" content={image.src ? image.src : image}/>
      <meta property="twitter:image:alt" content="pixl.page"/>
      <meta property="twitter:site" content="@pixlpage" />
    </Head>
  );
};

export default SEO;