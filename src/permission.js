import router from './router' // 引入路由实例
import store from './store' // 引入vuex
import nprogress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

// 设置白名单
const whiteList = ['/login', '/404']
// 路由前置守卫
// next(false) 跳转终止
router.beforeEach(async function(to, from, next) {
  nprogress.start() // 开启进度条
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断vuex中是否有userId 表示已有资料 不需要获取
      if (!store.getters.userId) {
        await store.dispatch('user/resetAdminName') // 重置管理员名称
        // async函数中return 返回的结果 用await可以接受到（getUserInfo中 最后return result 的原因
        const { roles } = await store.dispatch('user/getUserInfo') // 使用await 把异步任务改为同步任务，不然用户信息还未获取就会继续执行
        // console.log(roles.menus)
        // 此处为管理员id 避免管理员后台数据被修改而无法显示完整页面
        if (store.getters.userId === '1063705989926227968') {
          roles.menus = ['employees', 'permissions', 'settings', 'departments', 'approvals', 'social_securitys', 'attendances', 'salarys']
        }
        const routes = await store.dispatch('permission/filterRouter', roles.menus)
        // routes是筛选得到的动态路由
        // 动态路由添加到路由表中，在默认路由表中 静态路由 没有动态路由
        // addRoutes router的API方法 添加动态路由到路由表
        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
        // 404必须放在最后
        // addRoutes后必须用next(to.path)而不能直接用next() *已知缺陷
        next(to.path)
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done() // 解决手动切换地址 进度条不关闭的问题
})

// 路由后置守卫
router.afterEach(() => {
  nprogress.done() // 关闭进度条
})

// 不需要导出 import '@/permission' 代码执行就可
// 如果是 import abc from '@/permission'则需要导出
