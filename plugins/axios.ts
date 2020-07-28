import axios, { AxiosInstance } from 'axios'

export const instanceAxios: AxiosInstance = axios.create({
  baseURL: process.env.baseURL,
})
instanceAxios.interceptors.response.use(
  (res) => {
    const { data } = res
    if (data && data.code === 408) {
      if (process.env.NODE_ENV === 'production') {
        const callbackUrl = window.location.href
        return instanceAxios
          .get(`${process.env.authURL}/user/login/url?redirect=${callbackUrl}`)
          .then((redirectUrl) => {
            window.location.href = redirectUrl.toString()
          })
      }
    }
    return res.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instanceAxios
