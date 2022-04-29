import {createSlice, current} from '@reduxjs/toolkit';

const initialState = {
  currentCollection: {},
  currentCollectionAssets: [],
  currentAsset: null,
  index: null,
};

const currentCollectionSlice = createSlice({
  name: 'collections',
  initialState: initialState,
  reducers: {
    setCurrentCollectionName: (state, action) => {
      localStorage.removeItem('currentCollectionName');
      state.currentCollection = action.payload;
      localStorage.setItem('currentCollectionName', state.currentCollection.name);
    },

    setCurrentCollectionAssets: (state, action) => {
      state.currentCollectionAssets = [...action.payload];
    },

    setAsset: (state, action) => {
      const curState = current(state);
      const index = curState.currentCollectionAssets.findIndex(el => el.id === action.payload);
      state.currentAsset = current(state.currentCollectionAssets[index]);
      state.index = index;
    },

    nextAsset: (state, action) => {
      const curState = current(state);
      if (state.index === curState.currentCollectionAssets.length - 1) {
        state.index = 0;
        state.currentAsset = curState.currentCollectionAssets[0];
      } else {
        state.index++;
        state.currentAsset = curState.currentCollectionAssets[state.index];
      }
    },

    prevAsset: (state, action) => {
      const curState = current(state);
      if (state.index === 0) {
        state.index = curState.currentCollectionAssets.length - 1;
        state.currentAsset = curState.currentCollectionAssets[state.index];
      } else {
        state.index--;
        state.currentAsset = curState.currentCollectionAssets[state.index];
      }
    },
  },
});

export const {
  setCurrentCollectionName,
  setCurrentCollectionAssets,
  nextAsset,
  prevAsset,
  setAsset,
} = currentCollectionSlice.actions;

export default currentCollectionSlice;