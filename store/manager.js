import {createSlice, current} from '@reduxjs/toolkit';

const initialState = {
  assetCount: 0,
  collectionsState: [],
  assets: [],
  currentCollection: {},
  test: [],
};

export const managerSlice = createSlice({
  name: 'manager',
  initialState: initialState,
  reducers: {
    addCollectionState: (state, action) => {
      // state.collectionsState.push({collection: action.payload, all: true});
      state.collectionsState.push({collection: action.payload, assetCount: action.payload.assetCount});
    },

    updateAssets: (state, action) => {
      state.assets = state.assets.concat(action.payload);
    },

    updateCollectionState: (state, action) => {
      let hasAssets = state.assets.some((asset) => asset.collectionId === state.currentCollection.id);
      let position = state.collectionsState.findIndex((collectionState) => collectionState.collection.id === state.currentCollection.id);
      let assetCount = state.assets.filter(el => el.collectionId === state.currentCollection.id);

      if (hasAssets) {
        if (position !== -1) {
          state.collectionsState[position] = {
            collection: state.currentCollection,
            assetCount: assetCount.length,
          };
        } else {
          state.collectionsState.push({
            collection: state.currentCollection,
            assetCount: assetCount.length,
          });
        }
      } else {
        state.collectionsState.splice(position, 1);
      }
    },

    removeCollectionState: (state, action) => {
      let position = state.collectionsState.findIndex((collectionState) => collectionState.collection.id === action.payload.id);
      if (position !== -1) state.collectionsState.splice(position, 1);
      state.assets = state.assets.filter(el => el.collectionId !== action.payload.id);
    },

    addAsset: (state, action) => {
      let position = state.assets.findIndex((asset) => asset.id === action.payload.id);
      if (position === -1) state.assets.push(action.payload);
    },

    removeAsset: (state, action) => {
      if (state.collectionsState.length !== 0) {
        const collection = state.collectionsState.find(el => el.collection.id === action.payload.collectionId);
        const collectionPosition = state.collectionsState.findIndex(el => el.collection.id === action.payload.collectionId);
        const unique = state.assets.filter(el => el.collectionId === collection.collection.id);

        if (unique.length === 1) {
          state.collectionsState.splice(collectionPosition, 1);
        }
      }

      let position = state.assets.findIndex((asset) => asset.id === action.payload.id);
      if (position !== -1) state.assets.splice(position, 1);
    },

    removeAssetsOfCollection: (state, action) => {
      let assets = [];
      for (const asset of state.assets) {
        if (asset.collectionId !== action.payload.collectionId) {
          assets.push(asset);
        }
      }
      state.assets = assets;
    },

    setCurrentCollection: (state, action) => {
      state.currentCollection = action.payload;
    },

    countAsset: (state, action) => {
      if (action.payload.method === 'add') {
        state.assetCount += action.payload.collection.assetCount;

      } else if (action.payload.method === 'plus-one') {
        state.assetCount += 1;

      } else if (action.payload.method === 'minus-one') {
        if (action.payload.asset) {
          const position = state.collectionsState.findIndex(el => el.collection.id === action.payload.asset.collectionId);
          state.collectionsState[position].assetCount -= 1;
        }

        state.assetCount -= 1;

      } else if (action.payload.method === 'remove-only-selection') {
        const collection = state.collectionsState.find(el => el.collection.id === action.payload.collection.id);
        const count = state.assets.filter(el => el.collectionId === action.payload.collection.id);
        state.assetCount -= count.length;
        state.test = count;

      } else {
        state.assetCount -= action.payload.collection.assetCount;
      }
    },

    resetState: () => initialState,
  },
});

export const {
  addCollectionState,
  updateAssets,
  updateCollectionState,
  removeCollectionState,
  addAsset,
  removeAsset,
  removeAssetsOfCollection,
  setCurrentCollection,
  countAsset,
  resetState,
} = managerSlice.actions;

export default managerSlice;
