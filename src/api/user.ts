import { post } from '../http'
import type { ApiResponse } from '../http/types'

export interface LoginPayload {
  username: string
  password: string
}

export interface LoginUser {
  username: string
  token: string
  btnAuth: string[]
}

export const login = (payload: LoginPayload,): Promise<ApiResponse<LoginUser>> => {
  return post<LoginUser, LoginPayload>('https://www.demo.com/login', payload)
}
