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
    }
  ]
}
