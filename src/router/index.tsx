import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import type { MenuApiItem } from '../api/system'
import { addMenuRoutes as addMenuRoutesBase, type PatchableRouter } from './dynamic-routes'
import RequireAuth from './RequireAuth'

const Login = lazy(() => import('../pages/login'))
const NotFound = lazy(() => import('../pages/404'))
const PageLayout = lazy(() => import('../components/page-layout/PageLayout'))

// 根路由 id，用于后续动态补充子路由
export const ROOT_ROUTE_ID = 'root'

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
    id: ROOT_ROUTE_ID,
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

export const addMenuRoutes = (menuList: MenuApiItem[]) => {
  // 根据菜单数据动态添加路由
  addMenuRoutesBase(router as PatchableRouter, menuList, ROOT_ROUTE_ID)
}

export default router
