const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userId: state => state.user.userInfo.userId,
  username: state => state.user.userInfo.username,
  companyName: state => state.user.userInfo.companyName,
  departmentName: state => state.user.userInfo.departmentName,
  staffPhoto: state => state.user.userInfo.staffPhoto,
  conpanyId: state => state.user.userInfo.companyId,
  points: state => {
    if (state.user.userInfo.roles) {
      return state.user.userInfo.roles.points
    } else {
      return []
    }

    // return state.user.userInfo?.roles.points
  }
}
export default getters
