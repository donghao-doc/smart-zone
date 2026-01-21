import { Layout, theme } from 'antd'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import MenuNav from './menu-nav/MenuNav.tsx'
import PageBreadCrumb from './page-bread-crumb/PageBreadCrumb.tsx'
import PageHeader from './page-header/PageHeader.tsx'

const { Header, Content, Footer, Sider } = Layout

function PageLayout() {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const { token: { colorBgContainer } } = theme.useToken()

  return <div className="page-layout">
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <MenuNav />
      </Sider>
      <Layout>
        <Header style={{ paddingRight: '20px', background: colorBgContainer, textAlign: 'right' }}>
          <PageHeader />
        </Header>
        <Content style={{ margin: '0 16px', height: '90vh', overflowY: 'auto', overflowX: 'hidden' }}>
          <PageBreadCrumb />
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  </div>
}

export default PageLayout