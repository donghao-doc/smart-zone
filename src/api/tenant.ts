import { post } from '../http'
import type { ApiResponse } from '../http/types'

export interface UserListParams {
  page: number
  pageSize: number
  companyName?: string
  contact?: string
  phone?: string
}

export interface UserListItem {
  id: string
  name: string
  status: number | string
  tel: string
  business: string
  email: string
  creditCode: string
  industryNum: string
  organizationCode: string
  legalPerson: string
}

export interface UserListResponse {
  list: UserListItem[]
  total: number
}

export interface SaveUserPayload {
  id?: string
  name: string
  tel: string
  status: number
  business: string
  email: string
  creditCode: string
  industryNum: string
  organizationCode: string
  legalPerson: string
}

// Tenant list
export const getUserList = (
  data: UserListParams,
): Promise<ApiResponse<UserListResponse>> => {
  return post<UserListResponse, UserListParams>('/userList', data)
}

export const saveUser = (
  data: SaveUserPayload,
): Promise<ApiResponse<string>> => {
  return post<string, SaveUserPayload>('/editUser', data)
}

export const deleteUser = (id: string): Promise<ApiResponse<string>> => {
  return post<string, { id: string }>('/deleteUser', { id })
}

export const batchDeleteUser = (
  ids: string[],
): Promise<ApiResponse<string>> => {
  return post<string, { ids: string[] }>('/batchDeleteUser', { ids })
}
