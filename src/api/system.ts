import type { MenuProps } from 'antd'

import { get, post } from '../http'
import type { ApiResponse } from '../http/types'

export interface MenuApiItem {
  icon?: string
  label: string
  key: string
  menu?: boolean
  children?: MenuApiItem[]
}

export type MenuItem = NonNullable<MenuProps['items']>[number]

// 获取菜单列表
export const getMenuList = (
  token: string,
): Promise<ApiResponse<MenuApiItem[]>> => {
  return get<MenuApiItem[]>('/menu', { token })
}

interface AccountData{
  accountName: string
}

export function getAccountList(data: AccountData) {
  return post('/accountList', data)
}
