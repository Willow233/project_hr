
import Layout from '@/layout'

export default {
  path: '/users',
  component: Layout,
  hidden: true,
  name: 'user',
  children: [
    {
      path: '/users/approvals',
      component: () => import('@/views/users/approvals'),
      name: 'usersApprovals',
      hidden: true,
      meta: {
        title: '用户'
      }
    },
    {
      path: '/users/info',
      component: () => import('@/views/users/info'),
      name: 'myInfo',
      hidden: true,
      meta: {
        title: '我的信息'
      }
    },
    {
      path: '/users/apply',
      component: () => import('@/views/users/components/apply'),
      name: 'myApply',
      hidden: true,
      meta: {
        title: '加班离职'
      }
    },
    {
      path: '/users/leave-relevant',
      component: () => import('@/views/users/components/leave-relevant'),
      // name: 'myApply',
      hidden: true,
      meta: {
        title: '请假调休'
      }
    }
  ]
}
