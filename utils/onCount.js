/* Fetch Collection count of collection function */

import React from 'react';

async function onCount(address, type, collectionId) {
  if (type === 'collection') {
    try {
      const response = await fetch(`https://api.nano-frames.com/asset-service/wallets/${address}/collections/count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      return data;

    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      const response = await fetch(`https://api.nano-frames.com/asset-service/wallets/${address}/collections/${collectionId}/assets/count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      return data;

    } catch (e) {
      console.log(e);
    }
  }
}

export default onCount;