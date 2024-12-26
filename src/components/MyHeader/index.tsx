import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout, theme, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import './index.scss';
import { clearToken } from '../../store/login/authSlice';

const { Header } = Layout;

const items: MenuProps['items'] = [
  {
    label: <a>个人中心</a>,
    key: '0',
    icon: <UserOutlined />,
  },
  {
    label: <a>退出登录</a>,
    key: '1',
    icon: <LogoutOutlined />,
  },
];

function MyHeader() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick: MenuProps['onClick'] = e => {
    console.log('e', e);
    if (e.key === '0') {
      console.log('个人中心');
      // navigate('/user', { replace: true });
    }
    if (e.key === '1') {
      window.localStorage.removeItem('userInfo');
      dispatch(clearToken());
      // navigate('/login', { replace: true });
    }
  };

  return (
    <Header className="layout-header" style={{ background: colorBgContainer }}>
      <Dropdown menu={{ items, onClick }} trigger={['click']}>
        <a onClick={e => e.preventDefault()}>
          <Space>
            {JSON.parse(window.localStorage.getItem('userInfo') || '{}').nickname}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </Header>
  );
}

export default MyHeader;
