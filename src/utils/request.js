import store from '@/store'
import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth.js'
const TimeOut = 7200 // token超时时间

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // npm run dev =>api npm run build => /prod-api
  timeout: 5000 // 设置超时时间
})
// 请求拦截器

service.interceptors.request.use(config => {
  // 统一注入token
  if (store.getters.token) {
    // 检查token是否超时
    if (isTimeout()) {
      // token过期
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token已超时'))
    } else {
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
  }
  return config // 必须返回
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  // axios默认给数据加了一层data
  // 结构数据
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    // 实例化错误对象
    return Promise.reject(new Error(message))
  }
}, error => {
  // error 信息 里面 response的对象
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当等于10002的时候 表示 后端告知token超时了
    store.dispatch('user/logout') // 登出action 删除token
    router.push('/login')
  } else {
    Message.error(error.message) // 提示错误信息
  }
  return Promise.reject(error)// 返回执行错误 让当前的执行链跳出成功 直接进入catch
})

function isTimeout() {
  const currentTimeStamp = Date.now()
  const initTimeStamp = getTimeStamp()
  return (currentTimeStamp - initTimeStamp) / 1000 > TimeOut
}
export default service
