import { post } from '../http'
import type { ApiResponse } from '../http/types'

export interface ContractListParams {
  page: number
  pageSize: number
  contractNo?: string
  person?: string
  tel?: string
}

export interface ContractListItem {
  contractNo: string
  type: string
  name: string
  startDate: string
  endDate: string
  jia: string
  yi: string
  status: number | string
}

export interface ContractListResponse {
  list: ContractListItem[]
  total: number
}

export const getContractList = (
  data: ContractListParams,
): Promise<ApiResponse<ContractListResponse>> => {
  return post<ContractListResponse, ContractListParams>('/contractList', data)
}
