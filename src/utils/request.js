import axios from 'axios'
import { useUserStore } from '../store/user'

const request = axios.create({
  baseURL: '/api'
})

request.interceptors.request.use(config => {
  const store = useUserStore()
  if (store.token) {
    config.headers.Authorization = 'Bearer ' + store.token
  }
  return config
})

export default request