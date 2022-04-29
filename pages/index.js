import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import seoLading from '../public/pixl-page-landing.png';
import ContentAddressInput from '../components/ContentAddressInput/ContentAddressInput';
import {useRouter} from 'next/router';

function Home() {
  return (
    <>
      <Head>
        <meta property="og:title" content="pixl.page"/>
        <meta property="og:description" content="NFT frames for your collections"/>
        <meta property="og:site_name" content="pixl.page"/>
        <meta property="og:image" content={seoLading}/>
      </Head>
      <div className="homepage">
        <ContentAddressInput/>
      </div>
    </>
  );
}

export default Home;
