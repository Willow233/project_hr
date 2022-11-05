
import Layout from '@/layout'

const salaryRouter = {
  path: '/salarys',
  component: Layout,
  name: 'salarys',
  children: [
    {
      path: '',
      component: () => import('@/views/salarys'),
      name: '工资',
      meta: {
        title: '工资',
        icon: 'money'
      }
    },
    {
      path: 'setting',
      component: () => import('@/views/salarys/setting'),
      name: '工资设置',
      hidden: true,
      meta: {
        title: '工资设置'
      }
    },
    {
      path: 'details/:yearMonth/:id',
      component: () => import('@/views/salarys/detail'),
      name: '工资详情',
      hidden: true,
      meta: {
        title: '工资详情'
      }
    }
  ]
}
export default salaryRouter
