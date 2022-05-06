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

      {
        props.type && <meta property="og:image:type" content="image/jpeg"/>
      }

      <meta property="twitter:title" content={title}/>
      <meta property="twitter:site_name" content="pixl.page"/>
      <meta property="twitter:name" content={title}/>
      <meta property="twitter:description" content={description}/>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta property="twitter:image" content={image.src ? image.src : image}/>
    </Head>
  );
};

export default SEO;