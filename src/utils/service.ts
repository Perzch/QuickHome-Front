import axios, { type AxiosInstance } from "axios";
import ResponseData from '@/types'

const service:AxiosInstance = axios.create({
  baseURL: '/api',
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

service.interceptors.response.use((response):ResponseData => {
  if(response.status === 200) {
    return response.data
  }
  ElMessage.error(Response.data.message)
}, error => {
  ElMessage.error(Response.data.error)
})

export default service