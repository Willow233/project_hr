import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use()
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
  Message.error(error.message)
  return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入catch
})

export default service
