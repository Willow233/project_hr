import request from '@/utils/request'

// 登录接口封装
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {

}

export function logout() {

}
