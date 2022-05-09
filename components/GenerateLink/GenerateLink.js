import React, {useState, Fragment} from 'react';
import {Button} from 'primereact/button';
import {Sidebar} from 'primereact/sidebar';
import {useSelector} from 'react-redux';
import {getAssetIds, getCollectionIds} from '../../store/selector';
import {useRouter} from 'next/router';

const axios = require('axios');

function GenerateLink() {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(null);
  const [icon, setIcon] = useState('pi-copy');
  const collectionIds = useSelector((state) => getCollectionIds(state));
  const assetIds = useSelector((state) => getAssetIds(state));
  const collectionsState = useSelector(state => state.manager.collectionsState);
  const assets = useSelector(state => state.manager.assets);
  const router = useRouter();

  const handleClick = async () => {
    const walletAddress = router.query.address;
    const body = {walletAddress, assetIds, collectionIds};

    if (collectionsState.length <= 0) {
      return;
    }
    setLoading(true);

    axios.post(`${process.env.NEXT_PUBLIC_API}/pixl-page-service/pages`, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(function(response) {
      if (response.data) {
        setPage(`https://${window.location.hostname}/${response.data.alias}`);
        setVisible(true);
        setLoading(false);
      }
    }).catch(function(error) {
      console.log(error);
    });
  };

  const copy = () => {
    navigator.clipboard.writeText(page);
    setIcon('pi-check');
    setTimeout(() => {
      setIcon('pi-copy');
    }, 2000);
  };

  return (
    <Fragment>
      <Button tooltipOptions={{position: 'top'}}
              tooltip={collectionsState.length > 0 ? 'Create Page based on your selection' : 'Please select NFTs or collections to be added to your page'}
              label={`${loading ? 'CREATING...' : 'CREATE PAGE'}`}
              className={`btn btn-border-black btn--create ${collectionsState.length > 0 ? '' : 'btn-disabled'}`}
              onClick={handleClick}/>

      <Sidebar visible={visible}
               position="bottom"
               onHide={() => setVisible(false)}>

        <span className="link__title">Your page has been created!</span>

        <div className="link__main" onClick={copy}>
          <i style={{marginRight: '10px'}} className={`pi ${icon}`}/>{page}
        </div>
      </Sidebar>
    </Fragment>
  );
}

export default GenerateLink;