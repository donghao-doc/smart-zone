import axios from 'axios';
import { message } from 'antd';

const http = axios.create({
  baseURL: 'https://example.com',
  timeout: 10000,
});

// 请求拦截器
http.interceptors.request.use(config => {
  return config;
});

// 响应拦截器
http.interceptors.response.use(
  response => {
    // 2xx 范围内的状态码
    if (response.data.code === '0') {
      return response;
    } else {
      message.error(response.data.message || '请求失败，请稍后再试');
      return Promise.reject(response);
    }
  },
  error => {
    // 非 2xx 范围的状态码
    message.error(error.message || '请求失败，请稍后再试');
    return Promise.reject(error);
  }
);

export default http;
