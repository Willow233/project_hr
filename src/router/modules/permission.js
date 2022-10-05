import Layout from '@/layout'

export default {
  path: '/permission', // 一级路由地址
  name: 'permission', // 在权限设置时使用
  component: Layout,
  children: [{
    path: '', // ''表示二级路由的默认路由
    component: () => import('@/views/permission'),
    // 路由元信息 用于存储数据
    meta: {
      title: '权限管理', // 左侧导航栏名称
      icon: 'example'
    }
  }]
}
