import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'

import { store } from '../store'

// 默认超时时间（毫秒）
const DEFAULT_TIMEOUT = 10_000

// 统一 axios 实例，集中配置 baseURL、超时、默认 headers
const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  timeout: DEFAULT_TIMEOUT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// 统一错误结构，方便业务侧处理
export class HttpError extends Error {
  status?: number
  code?: string
  data?: unknown
  url?: string
  method?: string

  constructor(
    message: string,
    info: {
      status?: number;
      code?: string;
      data?: unknown;
      url?: string;
      method?: string;
    } = {},
  ) {
    super(message)
    this.name = 'HttpError'
    this.status = info.status
    this.code = info.code
    this.data = info.data
    this.url = info.url
    this.method = info.method
  }
}

// 从常见响应结构中提取错误信息
const extractMessage = (data: unknown, fallback: string) => {
  if (!data || typeof data !== 'object') {
    return fallback
  }
  const payload = data as Record<string, unknown>
  const message = payload.message ?? payload.msg ?? payload.error
  if (typeof message === 'string' && message.trim()) {
    return message
  }
  return fallback
}

// 将 axios 错误统一转换为 HttpError
const normalizeAxiosError = (error: AxiosError) => {
  if (error.response) {
    const { status, data, config } = error.response
    return new HttpError(extractMessage(data, error.message || `HTTP ${status}`), {
      status,
      code: error.code,
      data,
      url: config?.url,
      method: config?.method,
    })
  }

  if (error.request) {
    return new HttpError('Network error', {
      code: error.code,
    })
  }

  return new HttpError(error.message || 'Unknown error', { code: error.code })
}

// 请求拦截：自动注入 Authorization（token 来自 user store）
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

// 响应拦截：将错误归一化
http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => Promise.reject(normalizeAxiosError(error)),
)

export default http
