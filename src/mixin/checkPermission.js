import store from '@/store'
export default {
  methods: {
    checkPermission(key) {
      // 去用户的信息里面找 points中对应的标识key
      // store.state.user.userInfo.roles.points
      const { userInfo } = store.state.user
      if (userInfo.roles && userInfo.roles.points) {
        return userInfo.roles.points.some(item => item === key)
      }
      return false
    }
  }
}
