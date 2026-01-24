import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App.tsx'
import { persistor, store } from './store'

import 'normalize.css'
import './index.scss'

const bootstrap = async () => {
  if (import.meta.env.DEV) {
    await import('./mock')
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </StrictMode>,
  )
}

bootstrap()
