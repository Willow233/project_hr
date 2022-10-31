
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
      path: '/users/adjust-post',
      component: () => import('@/views/users/components/adjust-post'),
      name: 'adjust-post',
      hidden: true,
      meta: {
        title: '调岗'
      }
    },
    {
      path: '/users/apply',
      component: () => import('@/views/users/components/apply'),
      name: 'myApply',
      hidden: true,
      meta: {
        title: '申请'
      }
    },
    {
      path: '/users/become-worker',
      component: () => import('@/views/users/components/become-worker'),
      name: 'become-worker',
      hidden: true,
      meta: {
        title: '转正'
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
