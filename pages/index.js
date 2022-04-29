import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import seoLading from '../assets/images/pixl-page-landing.png';
import ContentAddressInput from '../components/ContentAddressInput/ContentAddressInput';
import SEO from '../components/SEO/SEO';
import {useRouter} from 'next/router';

function Home() {
  return (
    <>
      <SEO title="pixl.page" description="NFT frames for your collections" image={seoLading}/>
      <div className="homepage">
        <ContentAddressInput/>
      </div>
    </>
  );
}

export default Home;
