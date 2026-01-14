import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/login/Login.tsx'
import NotFound from '../pages/NotFound'

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
