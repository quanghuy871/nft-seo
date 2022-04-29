import React from 'react';
import ContentCardItem from '../ContentCardItem/ContentCardItem';
import ContentAssetItem from '../ContentAssetItem/ContentAssetItem';

function ContentCardList(props) {
  let collections, assets;

  if (props.type === 'collections') {
    collections = props.collections.filter(el => {
      if (props.input === '') {
        return el;
      } else {
        return el.name.toLowerCase().includes(props.input);
      }
    });
  }

  if (props.type === 'assets') {
    assets = props.assets.filter(el => {
      if (props.input === '') {
        return el;
      } else {
        return el.displayName.toLowerCase().includes(props.input);
      }
    });
  }

  return (
    <>
      {props.type === 'collections' ?
        collections.map((el) => <ContentCardItem selectAll={props.selectAll} collection={el} key={el.id}/>) :
        assets.map((el) => <ContentAssetItem selectAll={props.selectAll} assets={el} key={el.id}/>)
      }
    </>
  );
}

export default ContentCardList;