/* Fetch assets of collection function */

import React from 'react';
import {updateAssets} from '../store/manager';

async function onFetchAssets(address, collectionId, dispatch) {
  const page = 0;

  try {
    const response = await fetch(`https://api.nano-frames.com/asset-service/wallets/${address}/collections/${collectionId}/assets?page=${page}&pageSize=1000`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    dispatch(updateAssets(data.items));
  } catch (e) {
    console.log(e);
  }
}

export default onFetchAssets;