import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: 'theme',
    initialState: { value: 'light' },
    reducers: {
      onLightTheme(state) {
        state.value = 'light';
      },
      onDarkTheme(state) {
        state.value = 'dark';
      }
    }
  })
  
  export const { onLightTheme, onDarkTheme } = themeSlice.actions
  export default themeSlice.reducer