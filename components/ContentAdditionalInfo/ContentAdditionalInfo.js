import React from 'react';

function ContentAdditionalInfo(props) {

  return (
    <div className="el-additional-info metadata-card">
      <h3>Additional information:</h3>
      <div className="title">Collection id:</div>
      <div className="value">{props.asset.collectionId}</div>
    </div>
  );
}

export default ContentAdditionalInfo;