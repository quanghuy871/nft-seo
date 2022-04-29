import {createSlice, current} from '@reduxjs/toolkit';
import currentCollectionSlice from './currentCollection';

const initialState = {
  assets: [],
  currentAsset: null,
  index: null,
};

const pixlSlice = createSlice({
  name: 'pixl',
  initialState: initialState,
  reducers: {
    setAllAssets: (state, action) => {
      state.assets = [...action.payload];
    },

    setPixlAsset: (state, action) => {
      const curState = current(state);
      const index = curState.assets.findIndex(el => el.id === action.payload);
      state.currentAsset = current(state.assets[index]);
      state.index = index;
    },

    nextPixlAsset: (state, action) => {
      const curState = current(state);
      if (state.index === curState.assets.length - 1) {
        state.index = 0;
        state.currentAsset = curState.assets[0];
      } else {
        state.index++;
        state.currentAsset = curState.assets[state.index];
      }
    },

    prevPixlAsset: (state, action) => {
      const curState = current(state);
      if (state.index === 0) {
        state.index = curState.assets.length - 1;
        state.currentAsset = curState.assets[state.index];
      } else {
        state.index--;
        state.currentAsset = curState.assets[state.index];
      }
    },
  },
});

export const {
  setAllAssets,
  nextPixlAsset,
  prevPixlAsset,
  setPixlAsset,
} = pixlSlice.actions;

export default pixlSlice;
