import { message } from 'antd'
import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'

import { store } from '../store'
import type { ApiResponse } from './types'

const shouldShowErrMsg = (config?: AxiosRequestConfig) =>
  config?.showErrMsg !== false

// 统一 axios 实例，集中配置 baseURL、超时、默认 headers
const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  timeout: 10_000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

/**
 * 请求拦截器
 * - 自动注入 Authorization（token 来自 user store）
 */
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState().user.token
    if (!token) {
      return config
    }
    const headers = AxiosHeaders.from(config.headers)
    headers.set('Authorization', `Bearer ${token}`)
    config.headers = headers
    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

/**
 * 响应拦截器
 * - 按后端约定处理 code，失败时弹出提示
 */
http.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const res = response.data
    if (res.code === 200) {
      return res as unknown as AxiosResponse<ApiResponse>
    }
    if (res.message && shouldShowErrMsg(response.config)) {
      message.error(res.message)
    }
    return Promise.reject(res)
  },
  (error: AxiosError) => {
    if (!shouldShowErrMsg(error.config)) {
      return Promise.reject(error)
    }

    if (error.response) {
      const data = error.response.data as { message?: string } | undefined
      const messageText = data?.message || error.message || '请求失败'
      message.error(messageText)
      return Promise.reject(error)
    }

    if (error.request) {
      message.error('网络异常，请稍后重试')
      return Promise.reject(error)
    }

    message.error(error.message || '未知错误')
    return Promise.reject(error)
  },
)

export default http
