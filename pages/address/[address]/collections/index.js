import React, {useCallback, useEffect, useState} from 'react';
import ContentLoading from '../../../../components/ContentLoading/ContentLoading';
import ContentCardList from '../../../../components/ContentCardList/ContentCardList';
import GenerateLink from '../../../../components/GenerateLink/GenerateLink';
import Preview from '../../../../components/Preview/Preview';
import {useSelector} from 'react-redux';
import {InputText} from 'primereact/inputtext';
import InfiniteScroll from 'react-infinite-scroller';
import {useRouter} from 'next/router';

function Collections(props) {
  const [collections, setCollections] = useState([]);
  const [sorted, setSorted] = useState(false);
  const [sortType, setSortType] = useState('sort by name (A-Z)');
  const [totalCount, setTotalCount] = useState(0);
  const [syncStatus, setSyncStatus] = useState(true);
  const [syncProgress, setSyncProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState('');
  const router = useRouter();
  const collectionsState = useSelector(state => state.manager.collectionsState);
  const assets = useSelector(state => state.manager.assets);

  const fetchNFTs = useCallback(async (page = 0) => {
    try {
      const response = await fetch(`https://api.nano-frames.com/asset-service/wallets/${router.query.address}/collections?page=${page}&pageSize=50`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();

      if (data && data.items && data.items.length > 0) {
        setTotalCount(data.totalCount);
        setSyncStatus(false);

        if (page === 0) {
          setCollections(data.items);
        } else if (page > 0) {
          setCollections((prev) => prev.concat(data.items));
        }
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  });

  useEffect(() => {
    fetchNFTs();
  }, [router.query.address, props.selectAll]);

  const sortByName = () => {
    const newArr = collections.slice();
    const arraySort = newArr;

    if (!sorted) {
      const sortedCollections = arraySort.sort((a, b) => a.name < b.name ? -1 : 1);
      setSorted('sort decrease');
      setCollections(sortedCollections);
      setSortType('sort by name (Z-A)');

    } else if (sorted === 'sort decrease') {
      const sortedCollections = arraySort.reverse();

      setSorted(true);
      setCollections(sortedCollections);
      setSortType('sort by ID');
    } else {
      setSorted(false);
      setSortType('sort by name (A-Z)');
      fetchNFTs();
    }
  };

  return (
    <div className="collections">
      <div className="container">
        <div className="collections-controls">
          <h2>Your collections ({syncStatus ? 'synchronizing...' : totalCount})</h2>

          <div className="collections-controls__preview">
            {
              collections.length > 1 &&
              <span className="p-input-icon-left">
              <i className="pi pi-search"/>
              <InputText value={value} onChange={(e) => setValue(e.target.value.toLowerCase())} placeholder="Search"/>
              </span>
            }

            {
              collectionsState.length > 0 || assets.length > 0 ?
                <Preview></Preview> :
                null
            }
            <GenerateLink/>

            <button className="btn btn-border-black btn--sort" onClick={sortByName}>{sortType}</button>
          </div>
        </div>

        <div className="collections-grid">
          {loading && <ContentLoading/>}
          <InfiniteScroll
            pageStart={0}
            loadMore={fetchNFTs}
            hasMore={!syncStatus && collections.length < totalCount}
            className="collections-grid__wrapper"
          >
            <ContentCardList selectAll={props.selectAll} input={value} collections={collections} type="collections"/>
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

export default React.memo(Collections);