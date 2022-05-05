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
      <meta property="og:image:height" content="1200"/>
      <meta property="og:image:width" content="627"/>
    </Head>
  );
};

export default SEO;