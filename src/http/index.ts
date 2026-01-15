import type { AxiosRequestConfig } from 'axios'

import http from './http'
import type { ApiResponse } from './types'

// 透出给业务侧的请求配置类型
export type RequestConfig<D = unknown> = AxiosRequestConfig<D>

// GET 封装：返回拦截器处理后的数据
export function get<T = unknown, P = Record<string, unknown>>(
  url: string,
  params?: P,
  config?: RequestConfig<P>,
): Promise<ApiResponse<T>> {
  return http.get<ApiResponse<T>, ApiResponse<T>, P>(url, {
    ...config,
    params,
  })
}

// POST 封装：返回拦截器处理后的数据
export function post<T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: RequestConfig<D>,
): Promise<ApiResponse<T>> {
  return http.post<ApiResponse<T>, ApiResponse<T>, D>(url, data, config)
}
