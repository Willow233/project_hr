import Layout from '@/layout'

export default {
  path: '/approvals',
  component: Layout,
  name: 'approvals',
  children: [
    {
      path: '',
      component: () => import('@/views/approvals/index.vue'),
      name: 'approvals',
      meta: {
        title: '审批',
        icon: 'tree-table'
      }
    },
    {
      path: '/approvals/apply',
      component: () => import('@/views/approvals/components/apply'),
      name: 'apply',
      hidden: true,
      meta: {
        title: '加班离职申请',
        icon: 'approval', noCache: true }
    },
    {
      path: '/approvals/leave-relevant',
      component: () => import('@/views/approvals/components/leave-relevant'),
      name: 'leave-relevant',
      hidden: true,
      meta: {
        title: '请假调休',
        icon: 'approval', noCache: true }
    }
  ]
}
