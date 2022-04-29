import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {countAsset, removeAsset} from '../../store/manager';
import close from '../../assets/images/close.png';

function PreviewDetail(props) {
  const assets = useSelector((state) => state.manager.assets.filter((asset) => asset.collectionId === props.collection.id));
  const dispatch = useDispatch();

  return (
    <div className="preview-detail">
      {
        assets.map((asset, index) =>
          <div key={index} className="col-12">
            <div className="preview-detail-asset">
              <img alt={asset.displayName} src={asset.media.poster.url} style={{maxWidth: '30px', objectFit: 'contain', maxHeight: '40px'}}/>
              <div>{asset.displayName}</div>
              <button onClick={() => {
                dispatch(countAsset({method: 'minus-one'}));
                dispatch(removeAsset(asset));
              }} className="btn btn-close"><img className="img-fluid" src={close} alt="close"/></button>
            </div>
          </div>,
        )
      }
    </div>
  );
}

export default PreviewDetail;