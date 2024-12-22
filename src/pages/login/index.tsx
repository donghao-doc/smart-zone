import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.scss';
import logo from '../../assets/logo.png';
import { login } from '../../api/user';
import { setToken } from '../../store/login/authSlice';

type FieldType = {
  username?: string;
  password?: string;
};

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish: FormProps<FieldType>['onFinish'] = values => {
    setLoading(true);
    const { username, password } = values;
    login({ username: username!, password: password! })
      .then(({ data }) => {
        console.log('登录 data', data);
        dispatch(setToken(data.token));
        navigate('/');
      })
      .catch(err => {
        console.log('登录 err', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form name="loginForm" style={{ width: '100%' }} onFinish={onFinish} autoComplete="off">
      <Form.Item<FieldType>
        name="username"
        rules={[
          { required: true, message: '用户名不能为空' },
          { pattern: /^[a-zA-Z]{4,8}$/, message: '用户名只能是4-8位字母' },
        ]}
      >
        <Input placeholder="请输入用户名" prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item<FieldType> name="password" rules={[{ required: true, message: '密码不能为空' }]}>
        <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}

function Login() {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <img className="logo" src={logo} alt="logo" />
          <h1 className="title">智慧园区管理平台</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
