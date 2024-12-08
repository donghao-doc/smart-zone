import axios from 'axios';
import { message } from 'antd';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API || '',
  timeout: 5000,
});

// 请求拦截器
instance.interceptors.request.use((config) => {
  return config;
});

// 响应拦截器
instance.interceptors.response.use(
  // 第一个回调，表示请求本身是成功的，此时状态码是 2xx
  (response) => {
    // 如果状态码不是200，则认为请求返回的结果是失败的
    if (response.status !== 200) {
      message.error(response.statusText || '请求失败');
      return Promise.reject(response);
    }
    const resData = response.data;
    // 只有code为200，才表示业务是成功的
    if (resData.code === 200) {
      return resData;
    } else {
      message.error(resData.message || '业务失败');
      return Promise.reject(resData);
    }
  },
  // 第二个回调，表示请求本身是失败的，此时状态码是 4xx 或 5xx
  (error) => {
    message.error(error.message || '请求失败');
    return Promise.reject(error);
  }
);

// 封装请求方法
const http = {
  get: instance.get,
  post: instance.post,
};

export default http;
