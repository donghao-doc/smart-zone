import Mock from 'mockjs';

Mock.setup({
  timeout: '200-500',
});

const baseUrl = 'https://example.com';

// 登录接口
Mock.mock(`${baseUrl}/login`, 'post', options => {
  const { username, password } = JSON.parse(options.body);
  if (username === 'admin' && password === 'admin123') {
    return {
      code: '0',
      message: '登录成功',
      data: {
        token: 'mock-token-admin',
        userInfo: {
          id: 1,
          username: 'admin',
          nickname: '管理员',
        },
      },
    };
  }
  if (username === 'manager' && password === 'manager123') {
    return {
      code: '0',
      message: '登录成功',
      data: {
        token: 'mock-token-manager',
        userInfo: {
          id: 2,
          username: 'manager',
          nickname: '经理',
        },
      },
    };
  }
  if (username === 'user' && password === 'user123') {
    return {
      code: '0',
      message: '登录成功',
      data: {
        token: 'mock-token-user',
        userInfo: {
          id: 3,
          username: 'user',
          nickname: '用户',
        },
      },
    };
  }
  return {
    code: '401',
    message: '用户名或密码错误',
    data: null,
  };
});
