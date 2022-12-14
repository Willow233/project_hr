import Layout from '@/layout'

export default {
  path: '/department', // 一级路由地址
  name: 'departments', // 在权限设置时使用
  component: Layout,
  children: [{
    path: '', // ''表示二级路由的默认路由
    component: () => import('@/views/departments'),
    name: '组织架构',
    // 路由元信息 用于存储数据
    meta: {
      title: '组织架构', // 左侧导航栏名称
      icon: 'tree'
    }
  }]
}
