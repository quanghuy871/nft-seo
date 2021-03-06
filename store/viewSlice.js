import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  viewMode: 'collector',
};

const viewSlice = createSlice({
  name: 'view',
  initialState: initialState,
  reducers: {
    changeView(state, action) {
      state.viewMode = action.payload;
      localStorage.setItem('view', action.payload);
    },
  },
});

export default viewSlice;