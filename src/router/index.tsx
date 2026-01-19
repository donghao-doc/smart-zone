import { lazy } from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'

import { redirectIfAuthed, requireAuth } from './auth'

const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/login/Login'))
const NotFound = lazy(() => import('../pages/NotFound'))

const router = createBrowserRouter([
  {
    path: '/login',
    loader: redirectIfAuthed,
    element: <Login />,
  },
  {
    path: '/',
    loader: requireAuth,
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

export default router
