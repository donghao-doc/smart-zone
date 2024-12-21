import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.scss';
import logo from '../../assets/logo.png';

type FieldType = {
  username?: string;
  password?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = values => {
  console.log('Success:', values);
};

function LoginForm() {
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
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
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
