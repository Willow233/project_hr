import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

const state = {
  token: getToken() // 设置token为共享状态 初始化vuex的时候 就先从缓存中读取
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
  }
}

const actions = {
  async login(context, data) {
    // 调用api接口
    const result = await login(data)
    // axios默认给数据加了一层data 但在请求拦截器中解构了 直接返回了实际的数据data
    context.commit('setToken', result)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
