import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { ContractListItem } from '../api/finance'

export interface ContractSearchParams {
  contractNo: string
  person: string
  tel: string
}

export interface ContractListCache {
  formData: ContractSearchParams
  queryParams: ContractSearchParams
  dataList: ContractListItem[]
  total: number
  page: number
  pageSize: number
}

export interface FinanceState {
  contractListCache: ContractListCache | null
}

const initialState: FinanceState = {
  contractListCache: null,
}

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    setContractListCache(state, action: PayloadAction<ContractListCache>) {
      state.contractListCache = action.payload
    },
    clearContractListCache(state) {
      state.contractListCache = null
    },
  },
})

export const { setContractListCache, clearContractListCache } =
  financeSlice.actions

export default financeSlice.reducer
