import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RequireAuth from '../utils/RequireAuth';

const Home = lazy(() => import('../pages/home'));
const Login = lazy(() => import('../pages/login'));
const NotFound = lazy(() => import('../pages/404'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth needLogin={true}>
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: '/login',
    element: (
      <RequireAuth needLogin={false}>
        <Login />
      </RequireAuth>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
