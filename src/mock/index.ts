import Mock from 'mockjs';

const baseURL = process.env.REACT_APP_BASE_API || '';

Mock.mock(`${baseURL}/api/login`, 'post', (options) => {
  return {
    code: 200,
    message: '登录成功',
    data: {
      username: 'admin',
      token: 'token_1234567890',
    },
  };
});
