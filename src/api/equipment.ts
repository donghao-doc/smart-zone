import { post } from '../http'
import type { ApiResponse } from '../http/types'

export interface EquipmentListParams {
  page: number
  pageSize: number
  name?: string
  person?: string
}

export interface EquipmentListItem {
  id: number
  no: string
  name: string
  person: string
  tel: string
  time: string
  rest: string
  status: number | string
  last: string
  type: string
  from: string
}

export interface EquipmentListResponse {
  list: EquipmentListItem[]
  total: number
}

export const getEquipmentList = (
  data: EquipmentListParams,
): Promise<ApiResponse<EquipmentListResponse>> => {
  return post<EquipmentListResponse, EquipmentListParams>('/equipmentList', data)
}
