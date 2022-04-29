import React from 'react';
import onCapitalize from '../../utils/onCapitalize';
import Url from '../Url/Url';

function ContentMetaData(props) {
  return (
    <div className="el-metadata-list">
      {
        (typeof props.metaData === 'string' || props.metaData instanceof String) ?
          <Url value={props.metaData}></Url> :
          Array.isArray(props.metaData) ?
            props.metaData.map((value, index) => <ContentMetaData key={index} metaData={value}></ContentMetaData>) :
            (props.metaData.constructor === Object) ?
              Object.entries(props.metaData).map((property, index) => {
                if (property[0] !== 'image' && property[0] !== 'files') {
                  return (
                    <div key={index}>
                      <span className="title">{onCapitalize(property[0])}:</span>
                      <ContentMetaData metaData={property[1]}></ContentMetaData>
                    </div>
                  );
                }
                return null;
              }) :
              null
      }
    </div>
  );
}

export default ContentMetaData;