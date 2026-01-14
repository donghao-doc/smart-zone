import bg from '../../assets/bg.jpg'
import lgbg from '../../assets/lgbg.jpg'
import logo from '../../assets/logo.png'
import { useState } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined,LockOutlined  } from '@ant-design/icons';
import './login.scss'

function Login() {
  type LoginFormValues = {
    username: string
    password: string
  }

  const [form] = Form.useForm<LoginFormValues>()
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      // TODO: replace with real login request.
      console.log('login values', values)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login" style={{ backgroundImage: `url(${bg})` }}>
      <div className="lgbg" style={{ backgroundImage: `url(${lgbg})` }}>
        <div className="part">
          <div className="title">
            <div className="logo">
              <img src={logo} width={100} />
            </div>
            <h1>朋远智慧园区管理平台</h1>
          </div>
          <Form form={form}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '用户名不能为空' },
                { pattern:/^\w{4,8}$/,message:"用户名必须是4-8位数字字母组合"},
              ]}
            >
              <Input placeholder="请输入您的用户名" prefix={<UserOutlined/>}/>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '密码不能为空' }]}
            >
              <Input.Password placeholder="请输入您的密码" prefix={<LockOutlined/>}/>
            </Form.Item>
            <Form.Item >
              <Button
                type="primary"
                style={{width:"100%"}}
                onClick={handleLogin}
                loading={loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
