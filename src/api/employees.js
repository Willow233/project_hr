import request from '@/utils/request'

// 获取员工基础列表
export function getEmployeesSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

// 获取员工完整列表
export function getEmployeeList(params) {
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
export function saveUserDetailById(data) {
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

// 获取员工详细基础信息
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

// 保存员工详细基础信息
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.id}/personalInfo`,
    method: 'put',
    data
  })
}

// 获取员工岗位信息
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

// 保存员工岗位信息
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}

// 保存用户角色信息
export function assignRoles(data) {
  return request({
    url: `/sys/role/assignPrem`,
    method: 'put',
    data
  })
}
