import React, {useEffect, useRef, useState} from 'react';
import useOnLoadImages from '../../utils/onLoadImages';
import onSubString from '../../utils/onSubString';
import onCheckBase64 from '../../utils/onCheckBase64';
import {Sidebar} from 'primereact/sidebar';
import {Image} from 'primereact/image';
import {Tooltip} from 'primereact/tooltip';
import Buttons from '../Buttons/Buttons';
import ContentMetaData from '../ContentMetaData/ContentMetaData';
import ContentAdditionalInfo from '../ContentAdditionalInfo/ContentAdditionalInfo';
import ContentExpandedMetadata from '../ContentExpandedMetadata/ContentExpandedMetadata';
import Asset from '../Asset/Asset';
import {setAsset, nextAsset, prevAsset} from '../../store/currentCollection';
import {setPixlAsset, nextPixlAsset, prevPixlAsset} from '../../store/pixlManager';
import {countAsset, removeAsset, addAsset, addCollectionState, removeAssetsOfCollection, removeCollectionState, updateCollectionState} from '../../store/manager';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import arrowRight from './../../assets/images/arrow-right.svg';
import arrowLeft from './../../assets/images/arrow-left.svg';

function ContentAssetItem(props) {
  const [flip, setFlip] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  const [visibleLightbox, setVisibleLightbox] = useState(false);
  const [visibleFullscreen, setVisibleFullscreen] = useState(false);
  const firstRender = useRef(true);
  const itemWrapper = useRef();
  const wrapper = useRef();
  const imgRef = useRef();
  const imagesLoaded = useOnLoadImages(wrapper);
  const dispatch = useDispatch();
  const viewMode = useSelector(state => state.view.viewMode);
  const currentAsset = useSelector(state => state.currentCollection.currentAsset);
  const currentPixlAsset = useSelector(state => state.pixl.currentAsset);
  const assetsLength = useSelector(state => state.currentCollection.currentCollectionAssets).length;
  const pixlAssetsLength = useSelector(state => state.pixl.assets).length;
  const currentPage = document.querySelector('.content-page').classList.contains('assets');
  const router = useRouter();
  let checked = useSelector((state) => {
    const found = state.manager.assets.findIndex((asset) => asset.id === props.assets.id);
    if (found !== -1) return true;
    return false;
  });

  useEffect(() => {
    const wrapperEl = document.querySelector('.assets-grid__wrapper');

    // Prevent component from first render
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Flip the image to metadata
    if (flip) {
      setFlip(false);
    }

    // Added class based on image size - square, rectangle, portrait
    // For Squared
    if (imgRef.current.naturalHeight === imgRef.current.naturalWidth || imgRef.current.naturalWidth < imgRef.current.naturalHeight + 50) {
      itemWrapper.current.classList.add('asset__squared');
      wrapperEl.classList.add('grid__fit-squared');
    }

    // For Portrait
    if (imgRef.current.naturalHeight > imgRef.current.naturalWidth) {
      itemWrapper.current.classList.add('asset__portrait');
      wrapperEl.classList.add('grid__fit-squared');
    }

    // For Rectangle
    if (imgRef.current.naturalHeight + 100 < imgRef.current.naturalWidth) {
      itemWrapper.current.classList.add('asset__rectangle');
      wrapperEl.classList.add('grid__fit-rectangle');
    }

    // For wrapper
    if (wrapperEl.classList.contains('grid__fit-rectangle') && wrapperEl.classList.contains('grid__fit-squared')) {
      wrapperEl.classList.add('grid__modified');
    }
  }, [imagesLoaded, props.selectAll, viewMode]);

  // Select asset handle
  const selectHandle = () => {
    if (!checked) {
      dispatch(addAsset(props.assets));
      dispatch(countAsset({method: 'plus-one'}));
    } else {
      dispatch(countAsset({method: 'minus-one'}));
      dispatch(removeAsset(props.assets));
    }
    dispatch(updateCollectionState(false));
  };

  // Flip the image to metadata handle
  const showMetaHandle = () => {
    setFlip((prev) => !prev);
  };

  // Open expanded metadata sidebar handle
  const metadataSidebarHandle = () => {
    setVisibleRight((prev) => !prev);
  };

  // Open lightbox handle
  const lightboxHandle = () => {
    if (!currentPage) {
      dispatch(setPixlAsset(props.assets.id));
    } else {
      dispatch(setAsset(props.assets.id));
    }

    setVisibleLightbox((prev) => !prev);
    setVisibleFullscreen(false);

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

  // Open fullscreen mode handle
  const fullscreenHandle = () => {
    setVisibleFullscreen((prev) => !prev);
  };

  // Next and Prev image on lightbox view handle
  const imageSideHandle = (direction) => {
    if (direction === 'next') {
      dispatch(nextPixlAsset());
    } else {
      dispatch(prevPixlAsset());
    }
  };

  // Navigate to individual Asset page
  const navigateAssetHandle = () => {
    router.push(`/asset/${props.assets.id}`);
  };

  return (
    <div className={`${flip ? 'flipped' : ''} ${checked ? 'selected' : ''} ${imagesLoaded ? '' : 'mw-fixed'}`}>
      <div className={`el-asset-item`} ref={itemWrapper}>
        <div className="el-asset-item__img" ref={wrapper}>
          {
            flip ?
              <Buttons className="gallery-mode__only expand__metadata" tooltip="Expand metadata" type="Metadata Sidebar" onClick={metadataSidebarHandle}/> :
              currentPage && <Buttons className="gallery-mode__only select" checked={checked} tooltip={checked ? 'Unselect asset' : 'Select asset'} type="Select" onClick={selectHandle}/>
          }

          {
            !imagesLoaded && <i className="pi pi-spin pi-spinner"></i>
          }

          {
            imagesLoaded && <Buttons className="gallery-mode__only metadata" tooltip="Metadata" type="Metadata" onClick={showMetaHandle}/>
          }

          <img loading="lazy" onClick={lightboxHandle} ref={imgRef} className="img-fluid main__img" src={onCheckBase64(props.assets.media.poster.url)} alt={props.assets.displayName}/>

          <div className="el-asset-item__img-meta">
            {
              flip &&
              <div className="el-asset-item__img-meta__wrapper">
                <div className="el-metadata-list">
                  <span className="title">Collection:</span>
                  <span className="collection__name">{props.assets.collectionName}</span>
                </div>

                <ContentMetaData metaData={props.assets.onChainMetadata}/>
              </div>
            }
          </div>
        </div>

        <div className="el-asset-item__data position-relative">
          <div onClick={navigateAssetHandle} style={{margin: '0 auto'}}>
            <Tooltip mouseTrackTop={20} position="bottom" target=".title"/>

            <h6 data-pr-tooltip={props.assets.displayName} className="title">
              {props.assets.displayName ? onSubString(props.assets.displayName) : onSubString(props.assets.name)}
            </h6>
          </div>
          {
            imagesLoaded && <Buttons className="collector-mode__only metadata" tooltip="Metadata" type="Metadata" onClick={showMetaHandle}/>
          }

          {
            flip ?
              <Buttons className="collector-mode__only expand__metadata" tooltip="Expand metadata" type="Metadata Sidebar" onClick={metadataSidebarHandle}/> :
              currentPage && <Buttons className="collector-mode__only select" checked={checked} tooltip={checked ? 'Unselect asset' : 'Select asset'} type="Select" onClick={selectHandle}/>
          }
        </div>

        <ContentExpandedMetadata setVisible={() => setVisibleRight(false)} visible={visibleRight} asset={props.assets}/>

        {/*Modal for Lightbox*/}
        {
          !currentPage ?
            <Sidebar className="p-sidebar__fullscreen" visible={visibleLightbox} fullScreen onHide={() => setVisibleLightbox(false)}>
              <Asset asset={currentPixlAsset}/>

              {
                pixlAssetsLength > 1 &&
                <div className="navigators">
                  <button onClick={e => imageSideHandle('prev')} className="navigators__item navigators__left"><img className="img-fluid" src={arrowLeft.src} alt="prev"/></button>
                  <button onClick={e => imageSideHandle('next')} className="navigators__item navigators__right"><img className="img-fluid" src={arrowRight.src} alt="next"/></button>
                </div>
              }
            </Sidebar> :

            <Sidebar className="p-sidebar__fullscreen" visible={visibleLightbox} fullScreen onHide={() => setVisibleLightbox(false)}>
              <Asset asset={currentAsset}/>

              {
                assetsLength > 1 &&
                <div className="navigators">
                  <button onClick={() => dispatch(prevAsset())} className="navigators__item navigators__left"><img className="img-fluid" src={arrowLeft.src} alt="prev"/></button>
                  <button onClick={() => dispatch(nextAsset())} className="navigators__item navigators__right"><img className="img-fluid" src={arrowRight.src} alt="next"/></button>
                </div>
              }
            </Sidebar>
        }
      </div>
    </div>
  );
}

export default ContentAssetItem;