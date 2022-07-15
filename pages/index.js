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

{/*<div className="badges">*/}
{/*  <h4>Badges</h4>*/}

{/*  <div className="badges-wrapper">*/}
{/*    <div className="badges-wrapper__item">*/}
{/*      <div className="img--wrapper badge--radius">*/}
{/*        <img className="img-fluid" src={Sample.src} alt=""/>*/}
{/*      </div>*/}
{/*      <p>pixl.page</p>*/}
{/*    </div>*/}

{/*    <div className="badges-wrapper__item">*/}
{/*      <div className="img--wrapper badge--radius">*/}
{/*        <img className="img-fluid" src={Sample.src} alt=""/>*/}
{/*      </div>*/}
{/*      <p>pixl.page</p>*/}
{/*    </div>*/}

{/*    <div className="badges-wrapper__item">*/}
{/*      <div className="img--wrapper badge--radius">*/}
{/*        <img className="img-fluid" src={Sample.src} alt=""/>*/}
{/*      </div>*/}
{/*      <p>pixl.page</p>*/}
{/*    </div>*/}

{/*    <div className="badges-wrapper__item">*/}
{/*      <div className="img--wrapper badge--radius">*/}
{/*        <img className="img-fluid" src={Sample.src} alt=""/>*/}
{/*      </div>*/}
{/*      <p>pixl.page</p>*/}
{/*    </div>*/}

{/*    <div className="badges-wrapper__item">*/}
{/*      <div className="img--wrapper badge--radius">*/}
{/*        <img className="img-fluid" src={Sample.src} alt=""/>*/}
{/*      </div>*/}
{/*      <p>pixl.page</p>*/}
{/*    </div>*/}
{/*  </div>*/}

{/*  <div className="navigate--arrow">*/}
{/*    <a href="#" onClick={openYourBadgeHandle}>*/}
{/*      <img className="img-fluid" src={Arrow.src} alt="Arrow"/>*/}
{/*    </a>*/}
{/*  </div>*/}
{/*</div>*/}

{/*<div className="stats">*/}
{/*  <h4>Stats</h4>*/}

{/*  <div className="badges-wrapper">*/}
{/*    <div className="badges-wrapper__item">*/}
{/*      <div className="img--wrapper badge--radius">*/}
{/*        <img className="img-fluid" src={Sample.src} alt=""/>*/}
{/*      </div>*/}
{/*      <p>pixl.page</p>*/}
{/*    </div>*/}

{/*    <div className="badges-wrapper__item">*/}
{/*      <div className="img--wrapper badge--radius">*/}
{/*        <img className="img-fluid" src={Sample.src} alt=""/>*/}
{/*      </div>*/}
{/*      <p>pixl.page</p>*/}
{/*    </div>*/}

{/*    <div className="badges-wrapper__item">*/}
{/*      <div className="img--wrapper badge--radius">*/}
{/*        <img className="img-fluid" src={Sample.src} alt=""/>*/}
{/*      </div>*/}
{/*      <p>pixl.page</p>*/}
{/*    </div>*/}

{/*    <div className="badges-wrapper__item">*/}
{/*      <div className="img--wrapper badge--radius">*/}
{/*        <img className="img-fluid" src={Sample.src} alt=""/>*/}
{/*      </div>*/}
{/*      <p>pixl.page</p>*/}
{/*    </div>*/}

{/*    <div className="badges-wrapper__item">*/}
{/*      <div className="img--wrapper badge--radius">*/}
{/*        <img className="img-fluid" src={Sample.src} alt=""/>*/}
{/*      </div>*/}
{/*      <p>pixl.page</p>*/}
{/*    </div>*/}
{/*  </div>*/}

{/*  <div className="navigate--arrow">*/}
{/*    <a href="#">*/}
{/*      <img className="img-fluid" src={Arrow.src} alt="Arrow"/>*/}
{/*    </a>*/}
{/*  </div>*/}
{/*</div>*/}


{/*<Sidebar visible={yourBadge} position="right" onHide={() => setYourBadge(false)}>*/}
{/*  <ContentYourBadge/>*/}
{/*</Sidebar>*/}





export default Home;
