import React, {useEffect, useRef, useState} from 'react';
import SEO from '../../../components/SEO/SEO';
import Asset from '../../../components/Asset/Asset';
import useOnLoadImages from '../../../utils/onLoadImages';
import Buttons from '../../../components/Buttons/Buttons';
import ContentMetaData from '../../../components/ContentMetaData/ContentMetaData';
import ContentExpandedMetadata from '../../../components/ContentExpandedMetadata/ContentExpandedMetadata';
import Button from '../../../components/Buttons/Buttons';
import {Sidebar} from 'primereact/sidebar';

function AssetId({data}) {
  const [flip, setFlip] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  const [visibleFullScreen, setVisibleFullScreen] = useState(false);
  const wrapper = useRef();
  const imgRef = useRef();
  const imagesLoaded = useOnLoadImages(wrapper);

  const showMetaHandle = () => {
    setFlip((prev) => !prev);
  };

  const metadataSidebarHandle = () => {
    setVisibleRight((prev) => !prev);
  };

  const fullscreenHandle = () => {
    setVisibleFullScreen(true);

    if (imgRef.current.naturalHeight === imgRef.current.naturalWidth) {
      document.querySelector('body').classList.add('asset__square');
    } else {
      document.querySelector('body').classList.remove('asset__square');
    }

    if (imgRef.current.naturalHeight > imgRef.current.naturalWidth) {
      document.querySelector('body').classList.add('asset__portrait');
    } else {
      document.querySelector('body').classList.remove('asset__portrait');
    }

    if (imgRef.current.naturalHeight < imgRef.current.naturalWidth) {
      document.querySelector('body').classList.add('asset__rectangle');
    } else {
      document.querySelector('body').classList.remove('asset__rectangle');
    }
  };

  useEffect(() => {
    document.querySelector('.main-content').classList.add('individual__asset');
  }, []);

  return (
    <>
      <SEO title={data.displayName} image={data.media.poster.url}/>
      <div className="asset__individual">
        <div className="container">
          <div className={`asset__individual-wrapper ${flip ? 'flipped' : ''}`}>
            <div className="asset__individual-wrapper-item asset__inside el-asset-item">
              <div className="asset__inside-img el-asset-item__img" ref={wrapper}>
                {
                  !imagesLoaded && <i className="pi pi-spin pi-spinner"></i>
                }

                <div className="asset__inside-img__wrapper" onClick={fullscreenHandle}>
                  <Asset asset={data}/>

                  <img ref={imgRef} style={{display: 'none'}} src={data.media.poster.url} alt={data.displayName}/>

                  <div className="position-absolute" style={{
                    height: '100%',
                    width: '100%',
                    top: '0',
                    left: '0',
                  }}></div>
                </div>

                <div className="el-asset-item__img-meta">
                  {
                    flip &&
                    <div className="el-asset-item__img-meta__wrapper">
                      <div className="el-metadata-list">
                        <span className="title">Collection:</span>
                        <span className="collection__name">{data.collectionName}</span>
                      </div>

                      <ContentMetaData metaData={data.onChainMetadata}/>
                    </div>
                  }
                </div>
              </div>

              <div className="el-asset-item__data position-relative">

                {
                  imagesLoaded &&
                  <Buttons
                    className="collector-mode__only metadata"
                    tooltip="Metadata"
                    type="Metadata"
                    onClick={showMetaHandle}/>
                }

                <h6>{data.displayName}</h6>

                <Buttons className="collector-mode__only expand__metadata" tooltip="Expand metadata" type="Metadata Sidebar" onClick={metadataSidebarHandle}/>

                <ContentExpandedMetadata setVisible={() => setVisibleRight(false)} visible={visibleRight} asset={data}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Sidebar className="p-sidebar__fullscreen" visible={visibleFullScreen} fullScreen onHide={() => setVisibleFullScreen(false)}>
        <Asset asset={data}/>
      </Sidebar>
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`https://api.nano-frames.com/asset-service/assets/${context.params.id}`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,   // will be passed to the page component as props
    },
  };
}

export default AssetId;