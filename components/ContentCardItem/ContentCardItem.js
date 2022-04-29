import React, {useEffect, useState, useRef} from 'react';
import {subString} from '../../utils/subString';
import {useOnLoadImages} from '../../utils/onLoadImages';
import {useDispatch} from 'react-redux';
import Button from '../Buttons/Buttons';
import {addCollectionState, setCurrentCollection, removeAssetsOfCollection, removeCollectionState, countAsset} from '../../store/manager';
import {setCurrentCollectionName} from '../../store/currentCollection';
import {useSelector} from 'react-redux';
import {isCollectionsSelectedState} from '../../store/selector';
import {onUnitCheck} from '../../utils/onUnitCheck';
import {Tooltip} from 'primereact/tooltip';
import {useRouter} from 'next/router';

function ContentCardItem(props) {
  const wrapper = useRef();
  const imagesLoaded = useOnLoadImages(wrapper);
  const router = useRouter();
  const dispatch = useDispatch();
  const collectionId = props.collection.id;
  const checked = useSelector((state) => isCollectionsSelectedState(state, props.collection));

  const clickHandle = () => {
    dispatch(setCurrentCollection(props.collection));
    dispatch(setCurrentCollectionName(props.collection));
    router.push(`/address/${params.address}/collections/${collectionId}/assets`);
  };

  const selectHandle = () => {
    if (!checked) {
      dispatch(addCollectionState(props.collection));
      dispatch(countAsset({method: 'add', collection: props.collection}));
    } else {
      dispatch(removeAssetsOfCollection(props.collection));
      dispatch(removeCollectionState(props.collection));
      dispatch(countAsset({method: 'remove', collection: props.collection}));
    }
  };

  return (
    <div className={`el-card-item ${checked ? 'selected' : ''}`}>
      <div className="el-card-item__img" onClick={clickHandle}>
        {
          !imagesLoaded && <i className="pi pi-spin pi-spinner"></i>
        }
        <div className="el-card-item__img--wrapper">
          <div className="el-card-item__img--main" ref={wrapper}>
            <img loading="lazy" className="img-fluid" src={props.collection.poster.url} alt={props.collection.name}/>
          </div>
        </div>
      </div>

      <div className="el-card-item__data text-center position-relative">
        <Tooltip target=".assets__count"/>
        <div className="assets__count" data-pr-tooltip="Number of asset">
          <span>{props.collection.assetCount ? onUnitCheck(props.collection.assetCount) : ''}</span>
        </div>

        <h6>{subString(props.collection.name)}</h6>

        <Button tooltip={checked ? 'Unselect collection' : 'Select collection'} onClick={selectHandle} type="Select" name={props.collection.name}/>
      </div>
    </div>
  );
}

export default React.memo(ContentCardItem);