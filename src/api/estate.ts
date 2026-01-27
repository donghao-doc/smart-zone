import { post } from '../http'
import type { ApiResponse } from '../http/types'

export interface RoomListParams {
  roomid: string
}

export interface RoomItem {
  roomNumber: number
  decorationType: string
  area: number
  unitPrice: number
  src: string
}

export interface RoomListResponse {
  rooms: RoomItem[]
}

export const getRoomList = (
  data: RoomListParams,
): Promise<ApiResponse<RoomListResponse>> => {
  return post<RoomListResponse, RoomListParams>('/roomList', data)
}
