import 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    showErrMsg?: boolean
  }
}
