import router from './router' // 引入路由实例
import store from './store' // 引入vuex
import nprogress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

// 设置白名单
const whiteList = ['/login', '/404']
// 路由前置守卫
// next(false) 跳转终止
router.beforeEach(function(to, from, next) {
  nprogress.start() // 开启进度条
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
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
