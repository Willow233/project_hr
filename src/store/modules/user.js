import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getInfo, getUserDetailById } from '@/api/user'
// import { resetRouter } from '@/api/user'
const state = {
  token: getToken(), // 设置token为共享状态 初始化vuex的时候 就先从缓存中读取
  userInfo: {}
  // userinfo不能设为null,因为getters中引用userinfo的变量，如果设置为null，则会引起异常和报错
}

const mutations = {
  setToken(state, token) {
    state.token = token // 将数据设置给vuex
    // 同步给缓存
    setToken(token)
  },
  removeToken(state) {
    state.token = null // 将vuex中的数据置空
    removeToken() // 缓存中数据置空
  },
  setUserInfo(state, result) {
    state.userInfo = result
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }

}

const actions = {
  async login(context, data) {
    // 调用api接口
    const result = await login(data)
    // axios默认给数据加了一层data 但在请求拦截器中解构了 直接返回了实际的数据data
    context.commit('setToken', result) // 设置token
    setTimeStamp() // 设置当前时间戳
  },
  async getUserInfo(context) {
    const result = await getInfo()
    const baseInfo = await getUserDetailById(result.userId)
    context.commit('setUserInfo', { ...result, ...baseInfo })
    return result // 权限需要
  },
  logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
    // 重置路由
    // resetRouter()
    // 重置vuex下的路由
    // vuex子模块调用子模块的action
    // 1.不加命名空间 所有的mutation actions 挂载在全局上 可随意调用 （不建议）
    // 2. mutations 名称，载荷，payload 第三个参数 {root:true}调用根级的mutations 或 actions
    context.commit('permission/setRouter', [], { root: true })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
