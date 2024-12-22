import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import MyNav from '../../components/MyNav';
import MyBreadcrumb from '../../components/MyBreadcrumb';
import MyHeader from '../../components/MyHeader';

const { Content, Footer, Sider } = Layout;

function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <MyNav />
      </Sider>
      <Layout>
        <MyHeader />
        <Content style={{ margin: '0 16px' }}>
          <MyBreadcrumb />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Home;
