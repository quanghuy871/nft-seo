import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import {Tooltip} from 'primereact/tooltip';
import Button from '../Buttons/Buttons';
import {setCurrentCollectionName} from '../../store/currentCollection';
import {addCollectionState, setCurrentCollection, removeAssetsOfCollection, removeCollectionState, countAsset} from '../../store/manager';
import {isCollectionsSelectedState} from '../../store/selector';
import useOnLoadImages from '../../utils/onLoadImages';
import onUnitCheck from '../../utils/onUnitCheck';
import onCheckBase64 from '../../utils/onCheckBase64';
import onFetchAssets from '../../utils/onFetchAssets';

function ContentCardItem(props) {
  const wrapper = useRef();
  const imagesLoaded = useOnLoadImages(wrapper);
  const router = useRouter();
  const dispatch = useDispatch();
  const collectionId = props.collection.id;
  const checked = useSelector((state) => isCollectionsSelectedState(state, props.collection));

  // Move to asset page of that collection handle
  const clickHandle = () => {
    dispatch(setCurrentCollection(props.collection));
    dispatch(setCurrentCollectionName(props.collection));
    router.push(`/address/${router.query.address}/collections/${collectionId}/assets`);
  };

  // Select collection handle
  const selectHandle = () => {
    if (!checked) {
      // Fetch Assets of Collection when select collection
      onFetchAssets(router.query.address, props.collection.id, dispatch);
      dispatch(addCollectionState(props.collection));
      dispatch(countAsset({method: 'add', collection: props.collection}));
    } else {
      dispatch(countAsset({method: 'remove-only-selection', collection: props.collection}));
      dispatch(removeAssetsOfCollection(props.collection));
      dispatch(removeCollectionState(props.collection));
    }
  };

  return (
    <div className={`el-card-item ${checked ? 'selected' : ''}`}>
      <div className="el-card-item__img">
        {
          imagesLoaded &&
          <Button
            className="gallery-mode__only select"
            checked={checked}
            tooltip={checked ? 'Unselect collection' : 'Select collection'}
            onClick={selectHandle} type="Select"
            name={props.collection.name}/>
        }

        {
          !imagesLoaded && <i className="pi pi-spin pi-spinner"></i>
        }

        <div className="el-card-item__img--wrapper" onClick={clickHandle}>
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

        <Button className="collector-mode__only select"
                checked={checked} tooltip={checked ? 'Unselect collection' : 'Select collection'}
                onClick={selectHandle}
                type="Select"
                name={props.collection.name}/>
      </div>
    </div>
  );
}

export default React.memo(ContentCardItem);