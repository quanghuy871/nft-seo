/*
Homepage
*/

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import pixlThumbnail from '../assets/images/pixl.page_Icon.png';
import ContentAddressInput from '../components/ContentAddressInput/ContentAddressInput';
import {resetState} from '../store/manager';
import {useDispatch} from 'react-redux';
import SEO from '../components/SEO/SEO';
import {useRouter} from 'next/router';

function Home() {
  const dispatch = useDispatch();
  dispatch(resetState());

  return (
    <>
      <SEO
        title="pixl.page - Your NFT profile page"
        description="Create personal pages with your NFTs"
        image={pixlThumbnail}/>
      <div className="homepage">
        <ContentAddressInput/>
      </div>
    </>
  );
}

export default Home;
