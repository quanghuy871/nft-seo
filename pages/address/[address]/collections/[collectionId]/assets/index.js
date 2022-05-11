/*
Assets Page
*/

import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import {InputText} from 'primereact/inputtext';
import ContentLoading from '../../../../../../components/ContentLoading/ContentLoading';
import ContentCardList from '../../../../../../components/ContentCardList/ContentCardList';
import {setCurrentCollectionAssets} from '../../../../../../store/currentCollection';
import {addAsset, countAsset, removeAsset, updateCollectionState} from '../../../../../../store/manager';
import {getCollectionState} from '../../../../../../store/selector';
import InfiniteScroll from 'react-infinite-scroller';
import onCount from '../../../../../../utils/onCount';

function Assets() {
  const [assets, setAssets] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState(true);
  const [syncProgress, setSyncProgress] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();
  const currentCollection = useSelector(state => state.currentCollection.currentCollection.name);
  const collectionState = useSelector((state) => getCollectionState(state));
  const allAssets = useSelector(state => state.manager.assets);
  let assetNameFromStorage;

  const removeAssets = (assets) => {
    for (const asset of assets) {
      dispatch(removeAsset(asset));
    }

    dispatch(updateCollectionState(false));
  };

  const selectAssets = (assets) => {
    for (const asset of assets) {
      dispatch(addAsset(asset));
    }
    dispatch(updateCollectionState(true));
  };

  useEffect(() => {
    if (allAssets.filter(el => el.collectionId === collectionState.collection.id).length === collectionState.assetCount) {
      setSelectAll(true);
    }
  }, [allAssets]);

  const fetchAssets = useCallback(async (page = 0) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/asset-service/wallets/${router.query.address}/collections/${router.query.collectionId}/assets?page=${page}&pageSize=50`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const resCount = await onCount(router.query.address, 'assets', router.query.collectionId);

      const data = await response.json();

      if (data && data.items && data.items.length > 0) {
        setTotalCount(resCount.count);
        setSyncStatus(false);
        setCollectionName(data.items[0].collectionName);

        if (collectionState.all) {
          setSelectAll(true);
          selectAssets(data.items);
        }

        dispatch(setCurrentCollectionAssets(data.items));

        if (page === 0) {
          setAssets(data.items);
        } else if (page > 0) {
          setAssets((prev) => prev.concat(data.items));
        }
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  });

  useEffect(() => {
    fetchAssets();
  }, [router.query.collectionId]);

  const selectAllHandle = (e) => {
    e.preventDefault();
    selectAssets(assets);
    dispatch(countAsset({method: 'add', collection: collectionState.collection}));
    setSelectAll(true);
  };

  const unSelectAllHandle = (e) => {
    e.preventDefault();
    dispatch(countAsset({method: 'remove-only-selection', collection: collectionState.collection}));
    removeAssets(assets);
    setSelectAll(false);
  };

  onCount(router.query.address);

  return (
    <div className="content-page assets">
      <div className="container">
        <div className="assets-controls">
          <div className="assets-controls__count">
            <h2 className="mb-2">Your Assets ({totalCount ? totalCount : 'synchronizing...'})</h2>
            <h2>Collection: <span className="collection__name">{currentCollection ? currentCollection : collectionName}</span></h2>
          </div>

          <div className="assets-controls__preview">
            {
              assets.length > 1 &&
              <span className="p-input-icon-left">
              <i className="pi pi-search"/>
              <InputText value={value} onChange={(e) => setValue(e.target.value.toLowerCase())} placeholder="Search..."/>
            </span>
            }
            <a onClick={() => router.back()} className="btn btn-border-black btn--back" href="#">back</a>

            {
              selectAll ?
                <a onClick={unSelectAllHandle} className="btn btn-border-black btn--select-all" href="#">Unselect All</a> :
                <a onClick={selectAllHandle} className="btn btn-border-black btn--select-all" href="#">Select All</a>
            }
          </div>
        </div>

        <div className="assets-grid">
          {loading && <ContentLoading/>}

          <InfiniteScroll
            pageStart={0}
            loadMore={fetchAssets}
            hasMore={!syncStatus && assets.length < totalCount}
            className="assets-grid__wrapper"
          >
            <ContentCardList selectAll={selectAll} input={value} assets={assets} type="assets"/>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Assets;