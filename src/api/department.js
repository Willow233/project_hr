import request from '@/utils/request'

// 登录接口封装
export function getDepartmentTree() {
  return request({
    url: '/company/department',
    method: 'get'
  })
}

