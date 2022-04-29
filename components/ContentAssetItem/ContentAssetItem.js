import React, {useEffect, useRef, useState} from 'react';
import {useOnLoadImages} from '../../utils/onLoadImages';
import {subString} from '../../utils/subString';
import {Sidebar} from 'primereact/sidebar';
import {useDispatch, useSelector} from 'react-redux';
import {setAsset, nextAsset, prevAsset} from '../../store/currentCollection';
import {setPixlAsset, nextPixlAsset, prevPixlAsset} from '../../store/pixlManager';
import ContentMetaData from '../ContentMetaData/ContentMetaData';
import ContentAdditionalInfo from '../ContentAdditionalInfo/ContentAdditionalInfo';
import ContentExpandedMetadata from '../ContentExpandedMetadata/ContentExpandedMetadata';
import Buttons from '../Buttons/Buttons';
import Asset from '../Asset/Asset';
import arrowRight from './../../assets/images/arrow-right.svg';
import arrowLeft from './../../assets/images/arrow-left.svg';
import {Image} from 'primereact/image';
import {countAsset, removeAsset, addAsset, addCollectionState, removeAssetsOfCollection, removeCollectionState, updateCollectionState} from '../../store/manager';
import onCheckBase64 from '../../utils/onCheckBase64';

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
  let checked = useSelector((state) => {
    const found = state.manager.assets.findIndex((asset) => asset.id === props.assets.id);
    if (found !== -1) return true;
    return false;
  });

  useEffect(() => {
    const wrapperEl = document.querySelector('.assets-grid__wrapper');

    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (flip) {
      setFlip(false);
    }

    if (imgRef.current.naturalHeight === imgRef.current.naturalWidth || imgRef.current.naturalWidth < imgRef.current.naturalHeight + 50) {
      itemWrapper.current.classList.add('asset__squared');
      wrapperEl.classList.add('grid__fit-squared');
    }

    if (imgRef.current.naturalHeight > imgRef.current.naturalWidth) {
      itemWrapper.current.classList.add('asset__portrait');
      wrapperEl.classList.add('grid__fit-squared');
    }

    if (imgRef.current.naturalHeight + 100 < imgRef.current.naturalWidth) {
      itemWrapper.current.classList.add('asset__rectangle');
      wrapperEl.classList.add('grid__fit-rectangle');
    }

    if (wrapperEl.classList.contains('grid__fit-rectangle') && wrapperEl.classList.contains('grid__fit-squared')) {
      wrapperEl.classList.add('grid__modified');
    }
  }, [imagesLoaded, props.selectAll, viewMode]);

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

  const showMetaHandle = () => {
    setFlip((prev) => !prev);
  };

  const metadataSidebarHandle = () => {
    setVisibleRight((prev) => !prev);
  };

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

  const fullscreenHandle = () => {
    setVisibleFullscreen((prev) => !prev);
  };

  const imageSideHandle = (direction) => {
    if (direction === 'next') {
      dispatch(nextPixlAsset());
    } else {
      dispatch(prevPixlAsset());
    }
  };

  console.log(props.assets);

  return (
    <div className={`${flip ? 'flipped' : ''} ${checked ? 'selected' : ''} ${imagesLoaded ? '' : 'mw-fixed'}`}>
      <div className={`el-asset-item`} ref={itemWrapper}>
        <div className="el-asset-item__img" ref={wrapper}>
          {
            !imagesLoaded && <i className="pi pi-spin pi-spinner"></i>
          }

          <img onClick={lightboxHandle} ref={imgRef} className="img-fluid" src={onCheckBase64(props.assets.media.poster.url)} alt={props.assets.displayName}/>

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
          <h6>{props.assets.displayName ? props.assets.displayName : props.assets.name}</h6>
          {
            imagesLoaded && <Buttons tooltip="Metadata" type="Metadata" onClick={showMetaHandle}/>
          }

          {
            flip ?
              <Buttons tooltip="Expand metadata" type="Metadata Sidebar" onClick={metadataSidebarHandle}/> :
              currentPage && <Buttons checked={checked} tooltip={checked ? 'Unselect asset' : 'Select asset'} type="Select" onClick={selectHandle}/>
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