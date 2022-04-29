import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import {Tooltip} from 'primereact/tooltip';
import Button from '../Buttons/Buttons';
import {setCurrentCollectionName} from '../../store/currentCollection';
import {addCollectionState, setCurrentCollection, removeAssetsOfCollection, removeCollectionState, countAsset} from '../../store/manager';
import {isCollectionsSelectedState} from '../../store/selector';
import {useOnLoadImages} from '../../utils/onLoadImages';
import {onUnitCheck} from '../../utils/onUnitCheck';
import onCheckBase64 from '../../utils/onCheckBase64';

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
    router.push(`/address/${router.query.address}/collections/${collectionId}/assets`);
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
            <img
              loading="lazy"
              className="img-fluid"
              src={onCheckBase64(props.collection.poster.url)}
              alt={props.collection.name}/>
          </div>
        </div>
      </div>

      <div className="el-card-item__data text-center position-relative">
        <div className="assets__count">
          <Tooltip target=".count"/>
          <span className="count" data-pr-tooltip="Number of asset">
            {props.collection.assetCount ? onUnitCheck(props.collection.assetCount) : ''}
          </span>
        </div>

        <h6>{props.collection.name}</h6>

        <Button checked={checked} tooltip={checked ? 'Unselect collection' : 'Select collection'} onClick={selectHandle} type="Select" name={props.collection.name}/>
      </div>
    </div>
  );
}

export default React.memo(ContentCardItem);