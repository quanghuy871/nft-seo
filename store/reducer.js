import {configureStore} from '@reduxjs/toolkit';
import themeSlice from './themeSlice.js';
import viewSlice from './viewSlice';
import currentCollection from './currentCollection';
import manager from './manager';
import pixlSlice from './pixlManager';

const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    currentCollection: currentCollection.reducer,
    view: viewSlice.reducer,
    manager: manager.reducer,
    pixl: pixlSlice.reducer,
  },
});

export const {changeThemeMode} = themeSlice.actions;
export const {changeView} = viewSlice.actions;

export default store;