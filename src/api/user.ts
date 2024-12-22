import { post } from './http/request';

interface LoginRequestParams {
  username: string;
  password: string;
}
interface LoginResponseData {
  token: string;
  userInfo: {
    id: number;
    username: string;
    nickname: string;
  };
}

// 登录
export const login = (params: LoginRequestParams) => {
  return post<LoginResponseData>('/login', params);
};
