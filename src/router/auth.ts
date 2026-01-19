import { redirect } from 'react-router-dom'

import { persistor, store } from '../store'

const waitForRehydrate = () => {
  if (persistor.getState().bootstrapped) {
    return Promise.resolve()
  }
  return new Promise<void>((resolve) => {
    const unsubscribe = persistor.subscribe(() => {
      if (persistor.getState().bootstrapped) {
        unsubscribe()
        resolve()
      }
    })
  })
}

export const requireAuth = async () => {
  await waitForRehydrate()
  const token = store.getState().user.token
  if (!token) {
    return redirect('/login')
  }
  return null
}

export const redirectIfAuthed = async () => {
  await waitForRehydrate()
  const token = store.getState().user.token
  if (token) {
    return redirect('/')
  }
  return null
}
