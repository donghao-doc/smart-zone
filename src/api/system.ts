import type { MenuProps } from 'antd'

import { get } from '../http'
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
