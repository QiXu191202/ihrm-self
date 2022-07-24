import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getTimeStamp } from '@/utils/auth'
import router from '@/router'

const timeLen = 2 * 1000 * 60 * 60

const checkTimeOut = () => {
  // 判断是否登录失效
  let nowTime = Date.now()
  let loginTime = getTimeStamp()
  // 过期了
  return (nowTime - loginTime) >= timeLen
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截
service.interceptors.request.use(
  config => {
    const token = store.getters.token
    if (token) {
      if (checkTimeOut()) {
        Message.error('登录过期了,请重新登录')
        store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject('登录过期了,请重新登录')
      }
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const { data, message, success } = response.data
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  error => {
    if (error.response && error.response.status === 401 && error.response.data.code === 10002) {
      Message.error('登录过期了,请重新登录')
      store.dispatch('user/logout')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default service
