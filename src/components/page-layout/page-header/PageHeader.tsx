import { DownOutlined, PoweroffOutlined, UserOutlined } from '@ant-design/icons'
import { Dropdown, type MenuProps, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import type { AppDispatch, RootState } from '../../../store'
import { clearMenuList } from '../../../store/systemSlice'
import { clearUser } from '../../../store/userSlice'

const items: MenuProps['items'] = [
  {
    key: '1',
    label: '个人中心',
    icon: <UserOutlined />,
  },
  {
    key: '2',
    label: '退出登录',
    icon: <PoweroffOutlined />,
  },
]

function PageHeader() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const username = useSelector((state: RootState) => state.user.username)

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '1') {
      navigate('/personal')
      return
    }

    if (key === '2') {
      dispatch(clearUser())
      dispatch(clearMenuList())
      navigate('/login', { replace: true })
    }
  }

  return (
    <Dropdown menu={{ items, onClick }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          欢迎您,{username || '用户'}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  )
}

export default PageHeader
