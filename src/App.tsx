import { Spin } from 'antd'
import { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { getMenuList } from './api/system'
import router, { addMenuRoutes } from './router'
import type { AppDispatch, RootState } from './store'
import { setMenuList } from './store/systemSlice'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector((state: RootState) => state.user.token)
  const [menuReady, setMenuReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    if (!token) {
      setMenuReady(false)
      return () => {
        cancelled = true
      }
    }

    const bootstrapMenuRoutes = async () => {
      setMenuReady(false)
      try {
        const res = await getMenuList(token)
        if (cancelled) return
        dispatch(setMenuList(res.data))
        addMenuRoutes(res.data)
      } catch (error) {
        console.log('menu list fetch error:', error)
      } finally {
        if (!cancelled) {
          setMenuReady(true)
        }
      }
    }

    bootstrapMenuRoutes()

    return () => {
      cancelled = true
    }
  }, [dispatch, token])

  const shouldRenderRouter = !token || menuReady

  if (!shouldRenderRouter) {
    return <Spin />
  }

  return (
    <Suspense fallback={<Spin />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
