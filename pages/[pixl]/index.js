/*
Created page
*/

import React, {useCallback, createRef, useEffect, useRef, useState} from 'react';
import ContentLoading from '../../components/ContentLoading/ContentLoading';
import ContentCardList from '../../components/ContentCardList/ContentCardList';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentCollectionAssets} from '../../store/currentCollection';
import {addAsset} from '../../store/manager';
import {setAllAssets} from '../../store/pixlManager';
import InfiniteScroll from 'react-infinite-scroller';
import {getCollectionState} from '../../store/selector';
import {useRouter} from 'next/router';
import {useScreenshot} from 'use-react-screenshot';
import html2canvas from 'html2canvas';
import {decode as base64_decode, encode as base64_encode} from 'base-64';

function PixlPage({data}) {
  const [canvas, setCanvas] = useState(null);
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
  //
  // const ref = createRef(null);
  // const [image, takeScreenshot] = useScreenshot();
  // const getImage = () => {
  //   console.log('WORK');
  //   html2canvas(document.querySelector('.main-content'), {
  //     // allowTaint: true,
  //     onrendered: function(canvas) {
  //       document.body.appendChild(canvas);
  //       return Canvas2Image.saveAsPNG(canvas);
  //     },
  //   }).then(canvas => {
  //     document.body.appendChild(canvas);
  //     const newCanvas = canvas.toDataURL('image/png', 1.0);
  //     const decode = base64_encode(newCanvas);
  //     console.log(decode);
  //     setCanvas(newCanvas);
  //   });
  // };

  const fetchAssets = useCallback(async (page = 0) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/pixl-page-service/pages/${router.query.pixl}/assets?page=${page}&pageSize=50`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      console.log(data);

      if (data && data.items.length > 0) {
        setTotalCount(data.totalCount);
        setSyncStatus(false);
        dispatch(setAllAssets(data.items));

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
  }, [router.query.pixl]);

  return (
    <div className="content-page pixl">
      <div className="container">
        <div className="assets-controls">
          <div className="assets-controls__count">
            <h2 className="mb-2">Your Assets ({syncStatus ? 'synchronizing...' : totalCount})</h2>
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
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default PixlPage;