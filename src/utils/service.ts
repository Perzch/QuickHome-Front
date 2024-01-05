import axios, { type AxiosInstance } from "axios";
import {type ResponseData} from '@/types'

const service:AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
  }
})

service.interceptors.request.use(config => {
  if(localStorage.getItem('token')) {
    config.headers['authorization'] = 'Bearer ' + localStorage.getItem('token')
  }
  return config
})

// @ts-ignore
service.interceptors.response.use((response):ResponseData => {
  if(response.status === 200) {
    if(response.data.code === 200) return response.data
    if(response.data.code === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    ElMessage.error(response.data?.msg)
  }
  ElMessage.error(response.data?.msg)
})

export default service
