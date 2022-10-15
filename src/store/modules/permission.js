import { constantRoutes, asyncRoutes } from '@/router'

const state = {
  routes: [...constantRoutes, ...asyncRoutes]
  // routes: constantRoutes// 路由表 表示当前用户所拥有的路由权限

}
const mutations = {
  // 定义修改router的mutations
  // payload （newRoutes）认为是我们登录成功需要添加的新路由
  // setRouter(state, newRoutes) {
  //   state.routes = [...constantRoutes, ...newRoutes]
  // }
}
const actions = {
  // 筛选权限路由
  // menus 当前用户所拥有的权限 ['settings','permissions','权限管理中的标识']
  filterRouter(context, menus) {
    // 筛选出 动态路由中与menus中匹配的路由
    const routes = []
    menus.forEach(item => {
      routes.push(...asyncRoutes.filter(obj => obj.name === item))
    })
    context.commit('setRouter', routes)
    return routes // state数据是用于显示左侧菜单栏，而return 是给路由addRoutes使用
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
