import request from '@/utils/request'

// 登录接口封装
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户基本资料
export function getInfo() {
  // token 在请求拦截器中统一注入了 此处不需要token
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
