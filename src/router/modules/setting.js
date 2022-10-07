import Layout from '@/layout'

export default {
  path: '/setting', // 一级路由地址
  name: 'setting', // 在权限设置时使用
  component: Layout,
  children: [{
    path: '', // ''表示二级路由的默认路由
    component: () => import('@/views/setting'),
    // 路由元信息 用于存储数据
    meta: {
      title: '角色设置', // 左侧导航栏名称
      icon: 'setting'
    }
  }]
}
