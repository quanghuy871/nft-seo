import React, {useState, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DataView} from 'primereact/dataview';
import {Sidebar} from 'primereact/sidebar';
import {Button} from 'primereact/button';
import {ScrollPanel} from 'primereact/scrollpanel';
import {Badge} from 'primereact/badge';
import PreviewDetails from '../PreviewDetails/PreviewDetails';
import close from '../../assets/images/close.png';
import {countAsset, removeCollectionState} from '../../store/manager';

function Preview() {
  const [visible, setVisible] = useState(false);
  const collectionsState = useSelector(state => state.manager.collectionsState);
  const assetCount = useSelector(state => state.manager.assetCount);
  const dispatch = useDispatch();

  const itemTemplate = (collectionState) => {
    let collection = collectionState.collection;

    return (
      <div className="grid preview-detail-collection">
        <img alt={collection.name} src={collection.poster.url} style={{maxWidth: '40px', objectFit: 'contain', maxHeight: '50px'}}/>
        <div className="col-9 text-sm font-bold">{collection.name}</div>
        <button onClick={() => {
          dispatch(countAsset({method: 'remove-only-selection', collection: collection}));
          dispatch(removeCollectionState(collection));
        }} className="btn btn-close"><img className="img-fluid" src={close} alt="close"/></button>
        {
          collectionState.all ?
            <div className="preview-detail">
              <div className="col-12">
                <div className="preview-detail-asset"><Badge value="All"></Badge></div>
              </div>
            </div> :
            <PreviewDetails collection={collection}/>
        }
      </div>
    );
  };

  return (
    <Fragment>
      <Button label={`Preview selection`} className="btn btn-border-black btn--preview" onClick={() => setVisible(true)}/>
      <Sidebar visible={visible} position="right" onHide={() => setVisible(false)}>
        <ScrollPanel style={{width: '100%', height: '100%'}}>
          <h3>Your selection</h3>
          <h5>Assets: {assetCount}</h5>
          <DataView value={collectionsState} layout="list" itemTemplate={itemTemplate} paginator={false}/>
        </ScrollPanel>
      </Sidebar>
    </Fragment>
  );
}

export default Preview;