import Layout from '@/layout'

export default {
  path: '/salarys', // 一级路由地址
  name: 'salarys', // 在权限设置时使用
  component: Layout,
  children: [{
    path: '', // ''表示二级路由的默认路由
    component: () => import('@/views/salarys'),
    // 路由元信息 用于存储数据
    meta: {
      title: '薪资管理', // 左侧导航栏名称
      icon: 'money'
    }
  }]
}
