import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  username: string
  token: string
  btnAuth: string[]
}

const initialState: UserState = {
  username: '',
  token: '',
  btnAuth: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 同时更新用户名与 token
    setUser(state, action: PayloadAction<UserState>) {
      state.username = action.payload.username
      state.token = action.payload.token
      state.btnAuth = action.payload.btnAuth
    },
    // 单独更新用户名
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload
    },
    // 单独更新 token
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    },
    setBtnAuth(state, action: PayloadAction<string[]>) {
      state.btnAuth = action.payload
    },
    // 清空用户信息
    clearUser(state) {
      state.username = ''
      state.token = ''
      state.btnAuth = []
    },
  },
})

export const { setUser, setUsername, setToken, setBtnAuth, clearUser } =
  userSlice.actions

export default userSlice.reducer
