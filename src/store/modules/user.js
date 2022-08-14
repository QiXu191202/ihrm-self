import { loginApi, getUserInfoApi, getUserBaseInfoApi } from '@/api/user'
import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(), // token
  userInfo: {} // 用户信息
}
const mutations = {
  // 设置token
  setToken(state, data) {
    state.token = data
    setToken(data)
    setTimeStamp() //记录登录的时间戳
  },

  // 删除token
  removeToken(state) {
    state.token = null
    removeToken()
  },
  // 设置用户资料
  setUserInfo(state, data) {
    state.userInfo = data
  },
  // 删除用户资料
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    let res = await loginApi(data)
    // context.commit("")
    // context.commit("setToken", res)
    context.commit("setToken", res)
  },
  // 退出登录
  async logout(context) {
    context.commit("removeToken")
    context.commit("removeUserInfo")
    // 路由实例重置
    resetRouter()
    // 侧边栏设置初始值
    // 如果传递第三个参数为对象,配置root:true 则表示从跟模块开始
    commit("permission/setRoutes", [], { root: true })
  },
  // 获取用户资料
  async getUserInfo(context) {
    let res = await getUserInfoApi()
    let res1 = await getUserBaseInfoApi(res.userId)
    context.commit('setUserInfo', { ...res, ...res1 })
    return { ...res, ...res1 }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}