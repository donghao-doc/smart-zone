import type { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import type { RootState } from '../store'

type RequireAuthProps = {
  needLogin?: boolean
  children: ReactNode
}

const LOGIN_PATH = '/login'
const DEFAULT_AUTHED_REDIRECT = '/'

function RequireAuth({ needLogin = false, children }: RequireAuthProps) {
  const token = useSelector((state: RootState) => state.user.token)
  const isLogin = Boolean(token)
  const location = useLocation()

  // 未登录访问需要登录的页面，跳转到登录页
  if (needLogin && !isLogin) {
    return <Navigate to={LOGIN_PATH} replace />
  }

  // 已登录访问登录页，重定向到默认首页
  if (isLogin && location.pathname === LOGIN_PATH) {
    return <Navigate to={DEFAULT_AUTHED_REDIRECT} replace />
  }

  return <>{children}</>
}

export default RequireAuth
