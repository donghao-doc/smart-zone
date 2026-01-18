import { Spin } from 'antd'
import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'

import router from './router'

function App() {
  return (
    <Suspense fallback={<Spin />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
