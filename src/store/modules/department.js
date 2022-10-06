import { getDepartmentTree } from '@/api/department'

const state = {
  departmentTree: {}
}

const mutations = {
  setDepTree(state, result) {
    state.departmentTree = result
  }
}

const actions = {
  async getTree(context) {
    const result = await getDepartmentTree()
    context.commit('setDepTree', result)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
