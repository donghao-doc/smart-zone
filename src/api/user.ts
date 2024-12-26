import { get, post } from './http/request';

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

interface MenuResponseData {
  icon: string;
  label: string;
  key: string;
  children?: MenuResponseData[];
}

// 登录
export const login = (params: LoginRequestParams) => {
  return post<LoginResponseData>('/login', params);
};

// 获取菜单
export const queryMenu = () => {
  return get<MenuResponseData[]>('/menu');
};
