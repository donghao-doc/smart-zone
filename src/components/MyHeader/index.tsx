import { Layout, theme } from 'antd';

const { Header } = Layout;

function MyHeader() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return <Header style={{ padding: 0, background: colorBgContainer }} />;
}

export default MyHeader;
