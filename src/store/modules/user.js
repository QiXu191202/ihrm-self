import { loginApi, getUserInfoApi, getUserBaseInfoApi } from '@/api/user'
import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'

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
  async logout(context) {
    context.commit("removeToken")
    context.commit("removeUserInfo")
  },
  async getUserInfo(context) {
    let res = await getUserInfoApi()
    let res1 = await getUserBaseInfoApi(res.userId)
    context.commit('setUserInfo', { ...res, ...res1 })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}