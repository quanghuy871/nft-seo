import React, {Fragment, useState} from 'react';
import TooltipIcon from '../TooltipIcon/TooltipIcon';
import {Sidebar} from 'primereact/sidebar';
import ContentMetaData from '../ContentMetaData/ContentMetaData';
import ContentAdditionalInfo from '../ContentAdditionalInfo/ContentAdditionalInfo';

function ContentExpandedMetadata(props) {
  const [displayDevMetadata, setDisplayDevMetadata] = useState(false);

  const customIcons = (
    <Fragment>
      <button className="btn btn-icon" onClick={() => setDisplayDevMetadata(!displayDevMetadata)}>
        {
          displayDevMetadata ?
            <TooltipIcon text="Formatted view" position="left" class="view-formatted" icon="pi pi-bars"></TooltipIcon> :
            <TooltipIcon text="Metadata developer view" position="left" class="view-code" icon="pi pi-code"></TooltipIcon>
        }
      </button>
    </Fragment>
  );
  return (
    <Sidebar visible={props.visible} position="right" onHide={() => props.setVisible(false)} icons={customIcons}>
      <h3 className="collection__name">{props.asset.collectionName}</h3>

      {
        displayDevMetadata ?
          <div style={{fontSize: '12px', color: 'var(--text-color-1)'}}><pre>
            {JSON.stringify(props.asset.onChainMetadata, null, 2)}
          </pre>
          </div> :
          <Fragment>
            <ContentMetaData metaData={props.asset.onChainMetadata}/>
            <ContentAdditionalInfo asset={props.asset}/>
          </Fragment>
      }
    </Sidebar>
  );
}

export default ContentExpandedMetadata;