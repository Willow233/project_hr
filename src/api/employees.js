import request from '@/utils/request'

// 获取员工基础列表
export function getEmployeesSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

// 获取员工完整列表
export function getEmployeesList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

// 删除员工
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

// 新增员工
export function addNewEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

// 根据id获取员工基本信息
export function getBasicInfo(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

// 根据id保存员工信息
export function saveBasicInfo(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

// 批量导入员工的接口
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
