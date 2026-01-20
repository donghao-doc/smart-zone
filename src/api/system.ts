import { get } from '../http'
import type { ApiResponse } from '../http/types'

export interface MenuItem {
  icon: string
  label: string
  key: string
  children?: MenuItem[]
}

// 获取菜单列表
export const getMenuList = (): Promise<ApiResponse<MenuItem[]>> => {
  return get<MenuItem[]>('/menu')
}
