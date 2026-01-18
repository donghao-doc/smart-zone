import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/login/Login'))
const NotFound = lazy(() => import('../pages/NotFound'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router
