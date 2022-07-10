/*
Homepage
*/

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import pixlThumbnail from '../assets/images/icon_wbg.png';
import ContentAddressInput from '../components/ContentAddressInput/ContentAddressInput';
import ContentPDF from '../components/ContentPDF/ContentPDF';
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
      <div className="homepage homepage-content">
        <ContentAddressInput/>
        <ContentPDF/>
      </div>
    </>
  );
}


export default Home;
