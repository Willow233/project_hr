
import Layout from '@/layout'

const attendRouter = {
  path: '/attendances',
  component: Layout,
  name: 'attendances',
  children: [
    {
      path: '',
      component: () => import('@/views/attendances'),
      name: '考勤',
      meta: {
        title: '考勤',
        icon: 'excel' }
    }
  ]
}
export default attendRouter
