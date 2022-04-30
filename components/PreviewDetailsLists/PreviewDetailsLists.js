import React, {useState} from 'react';
import {Badge} from 'primereact/badge';
import PreviewDetails from '../PreviewDetails/PreviewDetails';
import {Tooltip} from 'primereact/tooltip';

function PreviewDetailsLists(props) {
  const [showAssets, setShowAssets] = useState(false);

  const showAssetsHandle = () => {
    setShowAssets(prev => !prev);
  };

  return (
    <div>
      <div className="preview-detail">
        <div className="col-12">
          <div className="preview-detail-asset" onClick={showAssetsHandle}>
            <Badge value={`Show assets: ${props.assetCount}`}></Badge>
          </div>
        </div>
      </div>

      {
        showAssets &&
        <PreviewDetails collection={props.collection}/>
      }
    </div>
  );
}

export default PreviewDetailsLists;