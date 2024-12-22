import http from './http';

interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

// GET 请求
async function get<T>(url: string, params?: Record<string, any>) {
  try {
    const res = await http.get<ApiResponse<T>>(url, { params });
    return res.data;
  } catch (error) {
    throw error;
  }
}

// POST 请求
async function post<T>(url: string, data?: Record<string, any>) {
  try {
    const res = await http.post<ApiResponse<T>>(url, data);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export { get, post };
