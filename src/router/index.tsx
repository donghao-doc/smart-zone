import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import RequireAuth from './RequireAuth'

const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/login/Login'))
const NotFound = lazy(() => import('../pages/NotFound'))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      // needLogin=true 表示该路由必须登录后访问
      <RequireAuth needLogin>
        <Home />
      </RequireAuth>
    ),
  },
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
    path: '*',
    element: (
      <RequireAuth needLogin>
        <NotFound />
      </RequireAuth>
    ),
  },
])

export default router
