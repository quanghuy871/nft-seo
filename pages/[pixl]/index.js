/*
Created page
*/

import React, {useCallback, useEffect, useRef, useState} from 'react';
import ContentLoading from '../../components/ContentLoading/ContentLoading';
import ContentCardList from '../../components/ContentCardList/ContentCardList';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentCollectionAssets} from '../../store/currentCollection';
import {addAsset} from '../../store/manager';
import {setAllAssets} from '../../store/pixlManager';
import InfiniteScroll from 'react-infinite-scroller';
import {getCollectionState} from '../../store/selector';
import {useRouter} from 'next/router';

function PixlPage({data}) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState(true);
  const [syncProgress, setSyncProgress] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [assets, setAssets] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const currentCollection = useSelector(state => state.currentCollection.currentCollection.name);
  const firstRender = useRef(true);

  const fetchAssets = useCallback(async (page = 0) => {
    try {
      // const response = await fetch(`https://api.nano-frames.com/pixl-page-service/pages/${router.query.pixl}/assets`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      // const data = await response.json();

      if (data && data.items.length > 0) {
        let items = data.items;
        setSyncStatus(false);
        setTotalCount(items.length);
        dispatch(setAllAssets(items));

        if (page === 0) {
          setAssets(items);
        } else {
          setAssets(assets.concat(items));
        }
        setLoading(false);
      } else {
        throw new Error();
      }
    } catch (e) {
      console.log(e);
    }
  });

  console.log(router);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    fetchAssets();
  }, [router.query.pixl]);

  return (
    <div className="content-page pixl">
      <div className="container">
        <div className="assets-controls">
          <div className="assets-controls__count">
            <h2 className="mb-2">Your Assets ({totalCount ? totalCount : 'synchronizing...'})</h2>
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

            <ContentCardList input={value} assets={assets} type="assets"/>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from external API

  const response = await fetch(`https://api.nano-frames.com/pixl-page-service/pages/${context.params.pixl}/assets`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log(response);

  const data = await response.json();
  return {props: {data}};

  // Pass data to the page via props
}

export default PixlPage;