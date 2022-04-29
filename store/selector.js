import {createSelector} from 'reselect';

export const isCollectionsSelectedState = createSelector(
  [
    state => state.manager.collectionsState,
    (state, collection) => collection,
  ],
  (collectionsState, collection) => {
    let position = collectionsState.findIndex((collectionState) => collectionState.collection.id === collection.id);
    if (position !== -1) return true;
    return false;
  },
);

export const getCollectionState = createSelector(
  [
    state => state.manager.collectionsState,
    state => state.manager.currentCollection,
  ],
  (collectionsState, collection) => {
    let position = collectionsState.findIndex((collectionState) => collectionState.collection.id === collection.id);
    if (position !== -1) return collectionsState[position];
    return {collection: collection, all: false};
  },
);

export const getCollectionIds = createSelector(
  [state => state.manager.collectionsState],
  (collectionsState) => {
    let finalCollections = [];
    for (const collectionState of collectionsState) {
      if (collectionState.all) {
        finalCollections.push(collectionState.collection.id);
      }
    }
    return finalCollections;
  },
);

export const getAssetIds = createSelector(
  [state => state.manager.assets],
  (assets) => {
    let finalAssets = [];
    for (const asset of assets) {
      finalAssets.push(asset.id);
    }
    return finalAssets;
  },
);