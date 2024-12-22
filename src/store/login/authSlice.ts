import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: window.localStorage.getItem('token') || '',
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      window.localStorage.setItem('token', action.payload);
    },
    clearToken: state => {
      state.token = '';
      window.localStorage.removeItem('token');
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
