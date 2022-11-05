import Layout from '@/layout'

export default {
  path: '/social_securitys',
  name: 'social_securitys',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/social'),
      name: '社保',
      meta: {
        title: '社保',
        icon: 'table'

      }
    },
    // 报表
    {
      path: 'detail/:id',
      hidden: true,
      component: () => import('@/views/social/detail'),
      name: '社保归档',
      meta: {
        title: '社保归档'
      }
    },
    // 历史归档
    {
      path: 'historicalArchiving',
      hidden: true,
      component: () => import('@/views/social/historical'),
      name: '历史归档',
      meta: {
        title: '历史归档'
      }
    },
    // 月报表
    {
      path: 'monthStatement',
      component: () => import('@/views/social/month'),
      name: '当月报表',
      hidden: true,
      meta: {
        title: '当月报表'
      }
    }
  ]
}
