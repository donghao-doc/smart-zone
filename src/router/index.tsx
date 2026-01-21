import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import RequireAuth from './RequireAuth'

const Login = lazy(() => import('../pages/login'))
const NotFound = lazy(() => import('../pages/404'))
const PageLayout = lazy(() => import('../components/page-layout/PageLayout'))

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      // 登录页不需要登录，但已登录会被 RequireAuth 重定向
      <RequireAuth>
        <Login />
      </RequireAuth>
    ),
  },
  {
    path: '/',
    element: (
      // needLogin=true 表示该路由必须登录后访问
      <RequireAuth needLogin>
        <PageLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

export default router
