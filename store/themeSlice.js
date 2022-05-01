import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  themeMode: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    changeThemeMode(state, action) {
      state.themeMode = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export default themeSlice;