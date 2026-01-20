import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import systemReducer from './systemSlice'
import userReducer from './userSlice'

const rootReducer = combineReducers({
  system: systemReducer,
  user: userReducer,
})

const persistedReducer = persistReducer(
  {
    key: 'smart-zone',
    storage,
    whitelist: ['system', 'user'],
  },
  rootReducer,
)

// 应用全局 store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
