const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // 建立token的快捷访问
  name: state => state.user.userInfo.username,
  userId: state => state.user.userInfo.userId,
  staffPhoto: state => state.user.userInfo.staffPhoto,
  routes: state => state.permission.routes // 建立路由的快捷访问 从而让sideBar可以动态显示左侧菜单栏
}
export default getters
