import request from '@/utils/request'

// 获取部门架构信息
export function getDepartments() {
  return request({
    url: '/company/department'
    // 默认是get方法
  })
}

// 删除部门
export function deleteDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

// 新增部门信息
export function addDepartments(data) {
  return request({
    url: '/company/department', // restful规范 同样的接口 不同的方法
    method: 'post',
    data
  })
}

// 根据ID 查询部门信息
export function getDeptDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

// 根据id修改部门信息
export function editDeptDetail(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}

