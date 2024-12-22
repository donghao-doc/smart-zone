import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import type { RootState } from '../store';

interface RequireAuthProps {
  needLogin: boolean;
  children: React.ReactNode;
}

function RequireAuth({ needLogin, children }: RequireAuthProps) {
  const token = useSelector((state: RootState) => state.auth.token);
  const location = useLocation();
  console.log('location', location);

  // 需要登录，但未登录，就跳转到登录页
  if (needLogin && !token) {
    return <Navigate to="/login" />;
  }

  // 已登录，但还去登录页，就跳转到首页
  if (token && location.pathname === '/login') {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default RequireAuth;
