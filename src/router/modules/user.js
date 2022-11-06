import Layout from '@/layout'

export default {
  path: '/user',
  component: Layout,
  hidden: true,
  name: 'users',
  children: [
    {
      path: '/user/apply',
      component: () => import('@/views/approvals/components/apply'),
      name: '加班离职申请',
      hidden: true,
      meta: {
        title: '加班离职申请',
        icon: 'approval', noCache: true }
    },
    {
      path: '/user/leave-relevant',
      component: () => import('@/views/approvals/components/leave-relevant'),
      name: '请假调休申请',
      hidden: true,
      meta: {
        title: '请假调休',
        icon: 'approval', noCache: true }
    },
    {
      path: 'detail/:id?', // query传参 动态路由传参 ?表示id不是必须的
      component: () => import('@/views/employees/detail'),
      name: '员工详情',
      hidden: true, // 表示该内容不在左侧菜单显示
      meta: {
        title: '员工详情' // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
      }
    }
  ]
}
