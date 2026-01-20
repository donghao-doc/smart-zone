import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { MenuApiItem } from '../api/system'

export interface SystemState {
  menuList: MenuApiItem[]
}

const initialState: SystemState = {
  menuList: [],
}

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setMenuList(state, action: PayloadAction<MenuApiItem[]>) {
      state.menuList = action.payload
    },
    clearMenuList(state) {
      state.menuList = []
    },
  },
})

export const { setMenuList, clearMenuList } = systemSlice.actions

export default systemSlice.reducer
