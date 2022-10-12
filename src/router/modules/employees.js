import Layout from '@/layout'

export default {
  path: '/employees', // 一级路由地址
  name: 'employees', // 在权限设置时使用
  component: Layout,
  children: [{
    path: '', // ''表示二级路由的默认路由
    component: () => import('@/views/employees'),
    // 路由元信息 用于存储数据
    meta: {
      title: '员工管理', // 左侧导航栏名称
      icon: 'user'
    }
  }, {
    path: 'detail/:id?', // query传参 动态路由传参 ?表示id不是必须的
    component: () => import('@/views/employees/detail'),
    hidden: true, // 表示该内容不在左侧菜单显示
    meta: {
      title: '员工详情' // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
    }
  },
  {
    path: 'print/:id?', // 二级默认路由
    component: () => import('@/views/employees/print'), // 按需加载
    hidden: true,
    meta: {
      title: '打印', // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
      icon: 'people'
    }
  }
  ]
}
