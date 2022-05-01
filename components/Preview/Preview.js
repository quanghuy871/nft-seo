import React, {useState, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DataView} from 'primereact/dataview';
import {Sidebar} from 'primereact/sidebar';
import {Button} from 'primereact/button';
import {ScrollPanel} from 'primereact/scrollpanel';
import {Badge} from 'primereact/badge';
import PreviewDetails from '../PreviewDetails/PreviewDetails';
import close from '../../assets/images/close.png';
import {countAsset, removeCollectionState, updateCollectionState} from '../../store/manager';
import onCheckBase64 from '../../utils/onCheckBase64';
import PreviewDetailsLists from '../PreviewDetailsLists/PreviewDetailsLists';

function Preview() {
  const [visible, setVisible] = useState(false);
  const collectionsState = useSelector(state => state.manager.collectionsState);
  const assetCount = useSelector(state => state.manager.assetCount);
  const dispatch = useDispatch();

  const itemTemplate = (collectionState) => {
    const collection = collectionState.collection;
    const assetCount = collectionState.assetCount;

    return (
      <div className="grid preview-detail-collection">
        <img alt={collection.name} src={onCheckBase64(collection.poster.url)} style={{maxWidth: '40px', objectFit: 'contain', maxHeight: '50px'}}/>
        <div className="col-9 text-sm font-bold main__collections">{collection.name}</div>
        <button onClick={() => {
          dispatch(countAsset({method: 'remove-only-selection', collection: collection}));
          dispatch(removeCollectionState(collection));
        }} className="btn btn-close"><img className="img-fluid" src={close.src} alt="close"/></button>

        <PreviewDetailsLists assetCount={assetCount} collection={collection}/>
      </div>
    );
  };

  return (
    <Fragment>
      <Button label="Preview selection" className="btn btn-border-black btn--preview" onClick={() => setVisible(true)}/>
      <Sidebar visible={visible} position="right" onHide={() => setVisible(false)}>
        <ScrollPanel style={{width: '100%', height: '100%'}}>
          <h3>Your selection</h3>
          <h5>Total assets: {assetCount}</h5>
          <DataView value={collectionsState} layout="list" itemTemplate={itemTemplate} paginator={false}/>
        </ScrollPanel>
      </Sidebar>
    </Fragment>
  );
}

export default Preview;