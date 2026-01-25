import { get } from '../http'
import type { ApiResponse } from '../http/types'

export interface EnergyDataItem {
  name: string
  data: number[]
}

// dashboard 图表数据
export const getEnergyData = (): Promise<ApiResponse<EnergyDataItem[]>> => {
  return get<EnergyDataItem[]>('/energyData')
}
