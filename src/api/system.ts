import type { MenuProps } from 'antd'

import { get } from '../http'
import type { ApiResponse } from '../http/types'

export type MenuItem = NonNullable<MenuProps['items']>[number]

// 获取菜单列表
export const getMenuList = (
  token: string,
): Promise<ApiResponse<MenuItem[]>> => {
  return get<MenuItem[]>('/menu', { token })
}
