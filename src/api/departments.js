import request from '@/utils/request'

// 获取部门信息
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

