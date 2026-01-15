import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { login } from '../../api/user'
import bg from '../../assets/bg.jpg'
import lgbg from '../../assets/lgbg.jpg'
import logo from '../../assets/logo.png'
import { type AppDispatch } from '../../store'
import { setUser } from '../../store/userSlice'

import './login.scss'

function Login() {
  type LoginFormValues = {
    username: string
    password: string
  }

  const [form] = Form.useForm<LoginFormValues>()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const handleLogin = async (values: LoginFormValues) => {
    try {
      setLoading(true)
      const res = await login(values)
      console.log('登录 res:', res)
      dispatch(setUser(res.data))
    } catch (err) {
      console.log('登录 err:', err)
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
              <img src={logo} width={100} alt="logo" />
            </div>
            <h1>朋远智慧园区管理平台</h1>
          </div>
          <Form form={form} onFinish={handleLogin}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '用户名不能为空' },
                { pattern: /^\w{4,8}$/, message: '用户名必须是4-8位数字字母组合' },
              ]}
            >
              <Input placeholder="请输入您的用户名" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '密码不能为空' }]}
            >
              <Input.Password placeholder="请输入您的密码" prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
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
