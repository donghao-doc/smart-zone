import type { AxiosRequestConfig, AxiosResponse } from 'axios'

import http from './http'

// 透出给业务侧的请求配置类型
export type RequestConfig<D = unknown> = AxiosRequestConfig<D>;

// GET 封装：返回 response.data
export function get<T = unknown, P = Record<string, unknown>>(
  url: string,
  params?: P,
  config?: RequestConfig<P>,
): Promise<T> {
  return http
    .get<T, AxiosResponse<T>, P>(url, {
      ...config,
      params,
    })
    .then((response) => response.data)
}

// POST 封装：返回 response.data
export function post<T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: RequestConfig<D>,
): Promise<T> {
  return http
    .post<T, AxiosResponse<T>, D>(url, data, config)
    .then((response) => response.data)
}
