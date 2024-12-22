import { configureStore } from '@reduxjs/toolkit';
import authSlice from './login/authSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
